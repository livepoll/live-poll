/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {RxStomp} from '@stomp/rx-stomp';
import {map as rxMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {OpenTextItem} from '../model/open-text-item';
import {QuizItem} from '../model/quiz-item';
import {MultipleChoiceItem} from '../model/multiple-choice-item';
import {MultipleChoiceItemAnswerParticipant} from '../model/multiple-choice-item-answer-participant';

const ENDPOINT_BROKER_URL = env.apiBaseWebsocketUrl + '/websocket/enter-poll';
const ENDPOINT_MESSAGING_READ_URL = '/user/v1/websocket/poll';
const ENDPOINT_MESSAGING_WRITE_URL = '/v1/websocket/answer';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompConfig = {
    brokerURL: ENDPOINT_BROKER_URL,
    reconnectDelay: 300
  };
  private stompClient;
  private subscription;

  /**
   * Tries to connect via the handshake endpoint of the websocket server
   */
  establishConnection(slug: string): Observable<MultipleChoiceItem|QuizItem|OpenTextItem> {
    this.stompClient = new RxStomp();
    this.stompClient.configure(this.stompConfig);
    this.stompClient.activate();

    return this.subscription = this.stompClient.watch(ENDPOINT_MESSAGING_READ_URL + '/' + slug).pipe(rxMap((msg: HttpResponse<any>) => {
      return JSON.parse(msg.body);
    }));
  }

  /**
   * Sends an answer via the websocket to the server
   *
   * @param pollItemId Id of the affected poll item
   * @param answer Answer object, which will be serialized
   */
  sendAnswer(pollItemId: number, answer: MultipleChoiceItemAnswerParticipant): boolean {
    console.log(answer);
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: ENDPOINT_MESSAGING_WRITE_URL + '/' + pollItemId,
        body: JSON.stringify(answer)
      });
      return true;
    }
    return false;
  }

  /**
   * Closes an established connection
   */
  closeConnection(): void {
    this.subscription.unsubscribe();
    this.stompClient.disconnect();
  }
}

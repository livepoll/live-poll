import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {QuizItemAnswer} from '../model/quiz-item-answer';
import {MultipleChoiceItemAnswer} from '../model/multiple-choice-item-answer';
import {OpenTextItemAnswer} from '../model/open-text-item-answer';
import {RxStomp} from '@stomp/rx-stomp';
import { map as rxMap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Poll} from '../model/poll';
import {OpenTextItem} from '../model/open-text-item';
import {QuizItem} from '../model/quiz-item';
import {MultipleChoiceItem} from '../model/multiple-choice-item';

const ENDPOINT_WEBSOCKET_URL = env.apiBaseWebsocketUrl + '/websocket';
const ENDPOINT_BROKER_URL = ENDPOINT_WEBSOCKET_URL + '/enter-poll';
const ENDPOINT_MESSAGING_READ_URL = '/user/v1/websocket/poll';
const ENDPOINT_MESSAGING_WRITE_URL = '/v1/websocket/answer';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient;
  private stompConfig = {
    brokerURL: ENDPOINT_BROKER_URL,
    reconnectDelay: 200
  };
  private subscription;

  /**
   * Initialize the service
   * @param http Injected http client
   */
  constructor(
    private http: HttpClient
  ) {}

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
   * @param answer Answer object, which will be serialized
   */
  sendAnswer(answer: MultipleChoiceItemAnswer|QuizItemAnswer|OpenTextItemAnswer): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: ENDPOINT_MESSAGING_WRITE_URL,
        body: JSON.stringify(answer)
      });
    }
  }

  /**
   * Closes an established connection
   */
  closeConnection(): void {
    this.subscription.unsubscribe();
    this.stompClient.disconnect();
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import {environment as env} from '../../environments/environment';
import {QuizItemAnswer} from '../model/quiz-item-answer';
import {MultipleChoiceItemAnswer} from '../model/multiple-choice-item-answer';
import {OpenTextItemAnswer} from '../model/open-text-item-answer';

const ENDPOINT_WEBSOCKET_URL = env.apiBaseWebsocketUrl + '/websocket';
const ENDPOINT_HANDSHAKE_URL = ENDPOINT_WEBSOCKET_URL + '/enter-poll';
const ENDPOINT_MESSAGING_READ_URL = ENDPOINT_WEBSOCKET_URL + '/poll';
const ENDPOINT_MESSAGING_WRITE_URL = ENDPOINT_WEBSOCKET_URL + '/answer';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket;
  private subject;

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
  establishConnection(slug: string): void {
    this.webSocket = webSocket({
      url: ENDPOINT_HANDSHAKE_URL,
      deserializer: ({data}) => data,
      serializer: msg => JSON.stringify(msg),
      openObserver: {
        next: () => console.log('socket connection established')
      },
      closeObserver: {
        next: () => console.log('socket connection closed')
      }
    });
    this.subject = this.webSocket.subscribe((data) => {
      console.log(data);
    });
  }

  /**
   * Sends an answer via the websocket to the server
   *
   * @param answer Answer object, which will be serialized
   */
  sendAnswer(answer: MultipleChoiceItemAnswer|QuizItemAnswer|OpenTextItemAnswer): void {
    this.subject?.next(answer);
  }

  /**
   * Closes an established connection
   */
  closeConnection(): void {
    this.subject.unsubscribe();
    this.webSocket?.complete();
  }
}

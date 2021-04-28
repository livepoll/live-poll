import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import {environment as env} from '../../environments/environment';

const ENDPOINT_WEBSOCKET_URL = env.apiBaseWebsocketUrl + '/websocket';
const ENDPOINT_HANDSHAKE_URL = ENDPOINT_WEBSOCKET_URL + '/enter-poll';
const ENDPOINT_MESSAGING_READ_URL = ENDPOINT_WEBSOCKET_URL + '/poll';
const ENDPOINT_MESSAGING_WRITE_URL = ENDPOINT_WEBSOCKET_URL + '/answer';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

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
    this.subject = webSocket({
      url: ENDPOINT_HANDSHAKE_URL,
      deserializer: ({data}) => data
    });
    this.subject.subscribe(console.log);
  }

  /**
   * Closes an established connection
   */
  closeConnection(): void {
    this.subject?.closeConnection();
  }
}

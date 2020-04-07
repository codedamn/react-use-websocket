import { SendMessage } from './use-websocket';
import { ReadyState } from './constants';
import { Options } from './use-websocket';
export interface SocketIOMessageData {
    type: string;
    payload: any;
}
export declare const useSocketIO: (url: string, options?: Options) => [SendMessage, SocketIOMessageData, ReadyState, () => WebSocket];

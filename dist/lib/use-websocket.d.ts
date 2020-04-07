import { QueryParams } from './socket-io';
import { ReadyState } from './constants';
export interface Options {
    fromSocketIO?: boolean;
    queryParams?: QueryParams;
    share?: boolean;
    onOpen?: (event: WebSocketEventMap['open']) => void;
    onClose?: (event: WebSocketEventMap['close']) => void;
    onMessage?: (event: WebSocketEventMap['message']) => void;
    onError?: (event: WebSocketEventMap['error']) => void;
    shouldReconnect?: (event: WebSocketEventMap['close']) => boolean;
    reconnectInterval?: number;
    reconnectAttempts?: number;
    filter?: (message: WebSocketEventMap['message']) => boolean;
    retryOnError?: boolean;
    enforceStaticOptions?: boolean;
}
export declare type ReadyStateState = {
    [url: string]: ReadyState;
};
export declare type SendMessage = (message: (string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView)) => void;
export declare const useWebSocket: (url: string, options?: Options) => [SendMessage, MessageEvent, ReadyState, () => WebSocket];

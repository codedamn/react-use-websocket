import { MutableRefObject } from 'react';
import { ReadyStateState, Options } from './use-websocket';
export interface Setters {
    setLastMessage: (message: WebSocketEventMap['message']) => void;
    setReadyState: (callback: (prev: ReadyStateState) => ReadyStateState) => void;
}
export declare const attachListeners: (webSocketInstance: WebSocket, url: string, setters: Setters, options: Options, reconnect: () => void, reconnectCount: MutableRefObject<number>, expectClose: MutableRefObject<boolean>) => () => void;

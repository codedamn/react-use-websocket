import { Setters } from './attach-listener';
import { ReadyStateState, Options } from './use-websocket';
export declare type Subscriber = {
    setLastMessage: (message: WebSocketEventMap['message']) => void;
    setReadyState: (callback: (prev: ReadyStateState) => ReadyStateState) => void;
    options: Options;
};
export declare type Subscribers = {
    [url: string]: Subscriber[];
};
export declare const addSubscriber: (webSocketInstance: WebSocket, url: string, setters: Setters, options?: Options) => () => void;

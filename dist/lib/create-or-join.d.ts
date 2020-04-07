import { MutableRefObject } from 'react';
import { ReadyStateState, Options } from './use-websocket';
export declare const createOrJoinSocket: (webSocketRef: MutableRefObject<WebSocket>, url: string, setReadyState: (callback: (prev: ReadyStateState) => ReadyStateState) => void, options: Options) => void;

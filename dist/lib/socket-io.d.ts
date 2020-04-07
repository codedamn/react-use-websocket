/// <reference types="node" />
export interface QueryParams {
    [key: string]: string | number;
}
export declare const parseSocketIOUrl: (url: string) => string;
export declare const appendQueryParams: (url: string, params?: QueryParams, alreadyHasParams?: boolean) => string;
export declare const setUpSocketIOPing: (socketInstance: WebSocket) => NodeJS.Timeout;

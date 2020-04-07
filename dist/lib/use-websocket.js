"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var socket_io_1 = require("./socket-io");
var attach_listener_1 = require("./attach-listener");
var constants_1 = require("./constants");
var create_or_join_1 = require("./create-or-join");
var proxy_1 = require("./proxy");
// export type WebSocketProxy = <typeof ProxyWebSocket>;
exports.useWebSocket = function (url, options) {
    if (options === void 0) { options = constants_1.DEFAULT_OPTIONS; }
    var _a = react_1.useState(null), lastMessage = _a[0], setLastMessage = _a[1];
    var _b = react_1.useState({}), readyState = _b[0], setReadyState = _b[1];
    var webSocketRef = react_1.useRef(null);
    var startRef = react_1.useRef(null);
    var reconnectCount = react_1.useRef(0);
    var expectClose = react_1.useRef(false);
    var webSocketProxy = react_1.useRef(null);
    var staticOptionsCheck = react_1.useRef(false);
    var convertedUrl = react_1.useMemo(function () {
        var converted = options.fromSocketIO ? socket_io_1.parseSocketIOUrl(url) : url;
        var alreadyHasQueryParams = options.fromSocketIO;
        return options.queryParams ?
            socket_io_1.appendQueryParams(converted, options.queryParams, alreadyHasQueryParams) :
            converted;
    }, [url]);
    var sendMessage = react_1.useCallback(function (message) {
        webSocketRef.current && webSocketRef.current.send(message);
    }, []);
    var getWebSocket = react_1.useCallback(function () {
        if (webSocketProxy.current === null) {
            webSocketProxy.current = proxy_1.default(webSocketRef.current, startRef);
        }
        return webSocketProxy.current;
    }, []);
    react_1.useEffect(function () {
        var removeListeners;
        var start = function () {
            expectClose.current = false;
            create_or_join_1.createOrJoinSocket(webSocketRef, convertedUrl, setReadyState, options);
            removeListeners = attach_listener_1.attachListeners(webSocketRef.current, convertedUrl, {
                setLastMessage: setLastMessage,
                setReadyState: setReadyState,
            }, options, startRef.current, reconnectCount, expectClose);
        };
        startRef.current = function () {
            expectClose.current = true;
            if (webSocketProxy.current)
                webSocketProxy.current = null;
            removeListeners();
            start();
        };
        start();
        return function () {
            expectClose.current = true;
            if (webSocketProxy.current)
                webSocketProxy.current = null;
            removeListeners();
        };
    }, [convertedUrl]);
    react_1.useEffect(function () {
        if (options.enforceStaticOptions !== false && staticOptionsCheck.current) {
            throw new Error('The options object you pass must be static');
        }
        staticOptionsCheck.current = true;
    }, [options]);
    var readyStateFromUrl = readyState[convertedUrl] !== undefined ? readyState[convertedUrl] : constants_1.ReadyState.CONNECTING;
    return [sendMessage, lastMessage, readyStateFromUrl, getWebSocket];
};
//# sourceMappingURL=use-websocket.js.map
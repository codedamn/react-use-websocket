"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("./socket-io");
var constants_1 = require("./constants");
var add_subscriber_1 = require("./add-subscriber");
exports.attachListeners = function (webSocketInstance, url, setters, options, reconnect, reconnectCount, expectClose) {
    var setLastMessage = setters.setLastMessage, setReadyState = setters.setReadyState;
    var interval;
    var reconnectTimeout;
    if (options.fromSocketIO) {
        interval = socket_io_1.setUpSocketIOPing(webSocketInstance);
    }
    if (options.share) {
        var removeSubscriber = add_subscriber_1.addSubscriber(webSocketInstance, url, {
            setLastMessage: setLastMessage,
            setReadyState: setReadyState,
        }, options);
        return removeSubscriber;
    }
    webSocketInstance.onmessage = function (message) {
        options.onMessage && options.onMessage(message);
        if (typeof options.filter === 'function' && options.filter(message) !== true) {
            return;
        }
        if (expectClose.current === false) {
            setLastMessage(message);
        }
    };
    webSocketInstance.onopen = function (event) {
        options.onOpen && options.onOpen(event);
        reconnectCount.current = 0;
        if (expectClose.current === false) {
            setReadyState(function (prev) {
                var _a;
                return Object.assign({}, prev, (_a = {}, _a[url] = constants_1.ReadyState.OPEN, _a));
            });
        }
    };
    webSocketInstance.onclose = function (event) {
        var _a, _b;
        options.onClose && options.onClose(event);
        if (expectClose.current === false) {
            setReadyState(function (prev) {
                var _a;
                return Object.assign({}, prev, (_a = {}, _a[url] = constants_1.ReadyState.CLOSED, _a));
            });
        }
        if (options.shouldReconnect && options.shouldReconnect(event)) {
            var reconnectAttempts = (_a = options.reconnectAttempts, (_a !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT));
            if (reconnectCount.current < reconnectAttempts) {
                if (expectClose.current === false) {
                    reconnectTimeout = setTimeout(function () {
                        reconnectCount.current++;
                        reconnect();
                    }, (_b = options.reconnectInterval, (_b !== null && _b !== void 0 ? _b : constants_1.DEFAULT_RECONNECT_INTERVAL_MS)));
                }
            }
            else {
                console.error("Max reconnect attempts of " + reconnectAttempts + " exceeded");
            }
        }
    };
    webSocketInstance.onerror = function (error) {
        var _a, _b;
        options.onError && options.onError(error);
        if (options.retryOnError) {
            if (reconnectCount.current < (_a = options.reconnectAttempts, (_a !== null && _a !== void 0 ? _a : constants_1.DEFAULT_RECONNECT_LIMIT))) {
                reconnectTimeout = setTimeout(function () {
                    reconnectCount.current++;
                    reconnect();
                }, (_b = options.reconnectInterval, (_b !== null && _b !== void 0 ? _b : constants_1.DEFAULT_RECONNECT_INTERVAL_MS)));
            }
        }
    };
    return function () {
        setReadyState(function (prev) {
            var _a;
            return Object.assign({}, prev, (_a = {}, _a[url] = constants_1.ReadyState.CLOSING, _a));
        });
        if (reconnectTimeout)
            clearTimeout(reconnectTimeout);
        webSocketInstance.close();
        if (interval)
            clearInterval(interval);
    };
};
//# sourceMappingURL=attach-listener.js.map
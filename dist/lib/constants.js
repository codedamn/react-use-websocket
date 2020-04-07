"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MILLISECONDS = 1;
var SECONDS = 1000 * MILLISECONDS;
exports.sharedWebSockets = {};
exports.DEFAULT_OPTIONS = {};
exports.SOCKET_IO_PING_INTERVAL = 25 * SECONDS;
exports.SOCKET_IO_PATH = '/socket.io/?EIO=3&transport=websocket';
exports.SOCKET_IO_PING_CODE = '2';
exports.DEFAULT_RECONNECT_LIMIT = 20;
exports.DEFAULT_RECONNECT_INTERVAL_MS = 5000;
var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["CONNECTING"] = 0] = "CONNECTING";
    ReadyState[ReadyState["OPEN"] = 1] = "OPEN";
    ReadyState[ReadyState["CLOSING"] = 2] = "CLOSING";
    ReadyState[ReadyState["CLOSED"] = 3] = "CLOSED";
})(ReadyState = exports.ReadyState || (exports.ReadyState = {}));
//# sourceMappingURL=constants.js.map
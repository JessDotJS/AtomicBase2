"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var AtomicMessaging = /** @class */ (function () {
    function AtomicMessaging() {
        this.instance = firebase.messaging();
    }
    return AtomicMessaging;
}());
exports.AtomicMessaging = AtomicMessaging;
//# sourceMappingURL=AtomicMessaging.js.map
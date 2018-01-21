"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var Observable_1 = require("rxjs/Observable");
var AtomicAuth = /** @class */ (function () {
    function AtomicAuth() {
        this.instance = firebase.auth();
    }
    AtomicAuth.prototype.init = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.instance.onAuthStateChanged(function (user) { return observer.next(user); }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    return AtomicAuth;
}());
exports.AtomicAuth = AtomicAuth;
//# sourceMappingURL=AtomicAuth.js.map
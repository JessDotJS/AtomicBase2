"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by jessdotjs on 23/06/17.
 */
var firebase = require("firebase");
var Server = /** @class */ (function () {
    function Server(ref) {
        this.ref = ref.root.child('atomicBase/server');
    }
    Server.prototype.update = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.ref.set({ TS: firebase.database.ServerValue.TIMESTAMP })
                .then(function (response) {
                resolve(response);
            }).catch(function (err) { reject(err); });
        });
    };
    Server.prototype.get = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.ref.once('value')
                .then(function (snapshot) {
                resolve(snapshot.val().TS);
            }).catch(function (err) { reject(err); });
        });
    };
    Server.prototype.serverTimestamp = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.update().then(function () {
                self.get().then(function (timestamp) {
                    resolve(timestamp);
                }).catch(function (err) { reject(err); });
            }).catch(function (err) { reject(err); });
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=Server.js.map
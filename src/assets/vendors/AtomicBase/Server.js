"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var Server = (function () {
    function Server(refObject) {
        this.serverRef = refObject.root.child('atomicBase/server');
    }
    Server.prototype.updateTS = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.serverRef.set({ TS: firebase.database.ServerValue.TIMESTAMP })
                .then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    Server.prototype.getTS = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.serverRef.once("value")
                .then(function (snapshot) {
                resolve(snapshot.val().TS);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    Server.prototype.getLatestTS = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.updateTS()
                .then(function (snapshot) {
                self.getTS()
                    .then(function (serverTS) {
                    resolve(serverTS);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return Server;
}());
exports.Server = Server;

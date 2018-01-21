"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var AtomicFile = /** @class */ (function () {
    function AtomicFile() {
        this.rootStorage = firebase.storage().ref();
        this.event = {
            changed: firebase.storage.TaskEvent.STATE_CHANGED
        };
        this.state = {
            paused: firebase.storage.TaskState.PAUSED,
            running: firebase.storage.TaskState.RUNNING
        };
    }
    AtomicFile.prototype.upload = function (file, ref, config) {
        var self = this;
        var uploadRef = self.rootStorage.child(ref + '/' + AtomicFile.generateName(file));
        return uploadRef.put(file);
    };
    AtomicFile.prototype.deleteFile = function (ref) {
        return this.rootStorage.child(ref).delete();
    };
    AtomicFile.generateName = function (file) {
        return AtomicFile.generateRandomNumbers() +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '.' +
            AtomicFile.getFileExtension(file);
    };
    AtomicFile.generateRandomNumbers = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    AtomicFile.getFileExtension = function (file) {
        switch (file.type) {
            case 'image/jpeg':
                return 'jpeg';
            case 'image/gif':
                return 'gif';
            case 'image/png':
                return 'png';
            case 'image/svg+xml':
                return 'svg';
            case 'application/pdf':
                return 'pdf';
            default:
                break;
        }
    };
    return AtomicFile;
}());
exports.AtomicFile = AtomicFile;
//# sourceMappingURL=AtomicFile.js.map
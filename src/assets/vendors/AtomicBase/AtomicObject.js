"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AtomicObject = (function () {
    function AtomicObject(db, objectRef) {
        this.db = db;
        this.item = {};
        this.objectRef = this.db.ref.root.child() || this.db.ref.primary;
    }
    AtomicObject.prototype.on = function () {
        var _this = this;
        this.id = "";
        var executor;
        executor = function (resolve, reject) {
            _this.db.server
                .getLatestTS()
                .then(function (serverTS) {
                _this.objectRef.once("value", function (snapshot) {
                    _this.item = _this.db.schema.build("snapshot", snapshot);
                    _this.id = _this.generateInstanceID();
                    resolve(_this.id);
                });
            });
        };
        return new Promise(executor);
    };
    AtomicObject.prototype.generateInstanceID = function () {
        return "";
    };
    return AtomicObject;
}());
exports.AtomicObject = AtomicObject;

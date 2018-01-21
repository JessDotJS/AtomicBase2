"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var RefRegistrator = /** @class */ (function () {
    function RefRegistrator(refsObject) {
        if (firebase !== undefined && firebase !== null) {
            /*
            * Database Related
            * */
            this.root = refsObject.root || firebase.database().ref();
            this.primary = refsObject.primary;
            this.secondary = refsObject.secondary || false;
            this.foreign = refsObject.foreign || false;
        }
        else {
            throw "Firebase has not been initialized, make sure you initialize it at the end of your index.html (firebase.initializeApp(config);)";
        }
    }
    RefRegistrator.prototype.getSecondaryRefs = function (atomicObject) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.secondary(atomicObject)
                .then(function (secondaryRefs) {
                resolve(secondaryRefs);
            }).catch(function (err) { reject(err); });
        });
    };
    RefRegistrator.prototype.getForeignRefs = function (atomicObject) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.foreign(atomicObject)
                .then(function (foreignRefs) {
                resolve(foreignRefs);
            })
                .catch(function (err) { reject(err); });
        });
    };
    return RefRegistrator;
}());
exports.RefRegistrator = RefRegistrator;
//# sourceMappingURL=RefRegistrator.js.map
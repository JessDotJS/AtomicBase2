"use strict";
/**
 * Created by jessdotjs on 23/06/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AtomicObject = /** @class */ (function () {
    function AtomicObject(atomicModule) {
        this.schema = atomicModule.schema;
        this.loaded = false;
        this.item = new BehaviorSubject_1.BehaviorSubject({});
    }
    /*
     * on
     * @Params:
     * ref: Database Reference
     * */
    AtomicObject.prototype.on = function (ref) {
        var _this = this;
        this.eventListenerRef = ref;
        return new Promise(function (resolve, reject) {
            _this.eventListenerRef.on('value', function (snapshot) {
                if (snapshot.exists()) {
                    if (_this.schema.dynamic) {
                        _this.item.next(snapshot.val());
                    }
                    else {
                        _this.item.next(_this.schema.build(snapshot, 'atomicObject'));
                    }
                }
                else {
                    _this.item.next({});
                }
                _this.loaded = true;
                resolve(true);
            });
        });
    };
    AtomicObject.prototype.off = function () {
        this.eventListenerRef.off('value');
    };
    return AtomicObject;
}());
exports.AtomicObject = AtomicObject;
//# sourceMappingURL=AtomicObject.js.map
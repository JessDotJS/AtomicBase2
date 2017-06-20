"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Value Handler
 * */
var ValueHandler = (function () {
    function ValueHandler() {
        this.default = null;
    }
    ValueHandler.prototype.getValue = function (value, data) {
        var self = this;
        var foundVal = null;
        var valueType = typeof value;
        if (value != undefined) {
            if (valueType == 'string' || valueType == 'number' || valueType == 'object' || valueType == 'boolean') {
                return self.handleNormal(value, data);
            }
            else if (valueType == 'function') {
                return self.handleFunction(value, data);
            }
        }
        else {
            return self.default;
        }
    };
    /*
     * Value Handlers
     * */
    ValueHandler.prototype.handleNormal = function (value, data) {
        var self = this;
        if (value == undefined) {
            value = self.default;
        }
        return value;
    };
    ValueHandler.prototype.handleFunction = function (value, data) {
        var self = this;
        if (value(data) == undefined) {
            value = self.default;
        }
        return value(data);
    };
    return ValueHandler;
}());
exports.ValueHandler = ValueHandler;

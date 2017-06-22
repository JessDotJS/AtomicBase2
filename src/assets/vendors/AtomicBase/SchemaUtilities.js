"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SchemaUtilities = (function () {
    function SchemaUtilities() {
    }
    SchemaUtilities.prototype.retrieveConfiguration = function (schema) {
        var schemaObject = {};
        if (schema) {
            for (var key in schema) {
                if (!schema.hasOwnProperty(key))
                    continue;
                schemaObject[key] = schema[key];
            }
        }
        else {
            return schemaObject = false;
        }
        return schemaObject;
    };
    return SchemaUtilities;
}());
exports.SchemaUtilities = SchemaUtilities;

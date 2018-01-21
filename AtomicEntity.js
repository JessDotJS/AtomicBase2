"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by jessdotjs on 22/06/17.
 */
var RefRegistrator_1 = require("./RefRegistrator");
var Schema_1 = require("./Schema");
var AtomicPriority_1 = require("./AtomicPriority");
var Query_1 = require("./Query");
var Server_1 = require("./Server");
var AtomicArray_1 = require("./AtomicArray");
var AtomicObject_1 = require("./AtomicObject");
var AtomicFile_1 = require("./AtomicFile");
var AtomicAuth_1 = require("./AtomicAuth");
var AtomicMessaging_1 = require("./AtomicMessaging");
var AtomicEntity = /** @class */ (function () {
    function AtomicEntity(dbObject) {
        /*
         * Refs Related
         * */
        this.ref = new RefRegistrator_1.RefRegistrator(dbObject.refs);
        /*
         * Atomic Priority
         * */
        this.atomicPriority = new AtomicPriority_1.AtomicPriority(dbObject.schema.priority || null, this.ref);
        /*
         * Schema Related
         * */
        this.schema = new Schema_1.Schema(dbObject.schema, this.atomicPriority);
        /*
         * Query Related
         * */
        this.query = new Query_1.Query(this.ref, this.schema);
        /*
         * Server Related
         * */
        this.server = new Server_1.Server(this.ref);
        /*
         * Atomic File Related
         * */
        this.atomicFile = new AtomicFile_1.AtomicFile();
        /*
         * Atomic Auth Related
         * */
        this.atomicAuth = new AtomicAuth_1.AtomicAuth();
        /*
         * Atomic Messaging Related
         * */
        this.atomicMessaging = new AtomicMessaging_1.AtomicMessaging();
    }
    /*
     * AtomicArray
     * */
    AtomicEntity.prototype.getArrayInstance = function () {
        return new AtomicArray_1.AtomicArray(this);
    };
    /*
     * AtomicObject
     * */
    AtomicEntity.prototype.getObjectInstance = function () {
        return new AtomicObject_1.AtomicObject(this);
    };
    /*
    * Query Based Methods
    * */
    AtomicEntity.prototype.create = function (record) {
        return this
            .query
            .create(record);
    };
    AtomicEntity.prototype.createWithCustomKey = function (record, customKey) {
        return this
            .query
            .createWithCustomKey(record, customKey);
    };
    AtomicEntity.prototype.update = function (record) {
        return this
            .query
            .update(record);
    };
    AtomicEntity.prototype.remove = function (record) {
        return this
            .query
            .remove(record);
    };
    /*
    * Storage Methods
    * */
    AtomicEntity.prototype.uploadFile = function (file, ref, config) {
        return this.atomicFile.upload(file, ref, config);
    };
    AtomicEntity.prototype.deleteFile = function (ref) {
        return this.atomicFile.deleteFile(ref);
    };
    return AtomicEntity;
}());
exports.AtomicEntity = AtomicEntity;
//# sourceMappingURL=AtomicEntity.js.map
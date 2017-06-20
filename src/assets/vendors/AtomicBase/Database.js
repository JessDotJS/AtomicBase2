"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RefRegistrator_1 = require("./RefRegistrator");
var AtomicPriority_1 = require("./AtomicPriority");
var Schema_1 = require("./Schema");
var Query_1 = require("./Query");
var Server_1 = require("./Server");
var AtomicArray_1 = require("./AtomicArray");
var AtomicFile_1 = require("./AtomicFile");
var Database = (function () {
    function Database(databaseObject) {
        /*
         * Refs Related
             * */
        this.ref = new RefRegistrator_1.RefRegistrator(databaseObject.refs);
        this.atomicPriority = new AtomicPriority_1.AtomicPriority(databaseObject.schema.priority || null, this.ref);
        /*
         * Schema Related
         * */
        this.schema = new Schema_1.Schema(databaseObject.schema, this.atomicPriority);
        /*
         * Query Related
         * */
        this.query = new Query_1.Query(this.ref, this.schema);
        /*
         * Server Related
         * */
        this.server = new Server_1.Server(this.ref);
        /*
         * Atomic Array Related
         * */
        this.atomicArray = new AtomicArray_1.AtomicArray(this.ref, this.schema, this.server, this.atomicPriority, databaseObject.filters);
        /*
         * Atomic File Related
         * */
        this.atomicFile = new AtomicFile_1.AtomicFile(this.ref);
    }
    return Database;
}());
exports.Database = Database;

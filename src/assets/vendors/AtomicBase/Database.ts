import {RefRegistrator} from './RefRegistrator' ;
import {AtomicPriority} from './AtomicPriority';
import {Schema} from './Schema';
import {Query} from './Query';
import {AtomicFile} from './AtomicFile';

export class Database {

    ref: any;
    atomicPriority: any;
    schema: any;
    query: any;
    atomicFile: any;

    constructor(databaseObject: any) {

        /*
         * Refs Related
         * */
        this.ref = new RefRegistrator(databaseObject.refs);

        /*
        * Atomic Priority
        * */
        this.atomicPriority = new AtomicPriority(databaseObject.schema.priority || null, this.ref);

        /*
         * Schema Related
         * */
        this.schema = new Schema(databaseObject.schema, this.atomicPriority);


        /*
         * Query Related
         * */
        this.query = new Query(this.ref, this.schema);


        /*
         * Atomic File Related
         * */
        this.atomicFile = new AtomicFile(this.ref);


    }


}
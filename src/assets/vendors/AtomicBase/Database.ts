import {RefRegistrator} from './RefRegistrator' ;
import {AtomicPriority} from './AtomicPriority';
import {Schema} from './Schema';
import {Query} from './Query';
import {Server} from './Server';
//import {AtomicArray} from './AtomicArray';
import {AtomicFile} from './AtomicFile';

export class Database {

    ref:any;
    atomicPriority:any;
    schema:any;
    query:any;
    server:any;
    atomicArray:any;
    atomicFile:any;

    constructor(databaseObject:any){

        /*
         * Refs Related
             * */
        this.ref = new RefRegistrator(databaseObject.refs);

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
         * Server Related
         * */
        this.server = new Server(this.ref);


        /*
         * Atomic Array Related
         * */
        //this.atomicArray = new AtomicArray(this.ref, this.schema, this.server, this.atomicPriority, databaseObject.filters);



        /*
         * Atomic File Related
         * */
        this.atomicFile = new AtomicFile(this.ref);


    }


}
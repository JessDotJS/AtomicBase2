/**
 * Created by jessdotjs on 22/06/17.
 */
import {RefRegistrator} from './RefRegistrator' ;
import {AtomicPriority} from './AtomicPriority';
import {Schema} from './Schema';
import {Query} from './Query';
<<<<<<< HEAD
import {Server} from './Server';
import {AtomicFile} from './AtomicFile';
import {AtomicArray} from './AtomicArray';
=======
import {AtomicFile2} from './AtomicFile2';

>>>>>>> 35932f06e6fa9c7d765c477dee06fd48945f474c




export class AtomicEntity {
    public ref: any;
    public atomicPriority: any;
    public schema: any;
    public query: any;
    public server: any;
    public atomicFile: any;
    public atomicArray: any;

    constructor(dbObject: any) {
  
        /*
         * Refs Related
         * */
        this.ref = new RefRegistrator(dbObject.refs);

        /*
         * Atomic Priority
         * */
        this.atomicPriority = new AtomicPriority(dbObject.schema.priority || null, this.ref);

        /*
         * Schema Related
         * */
        this.schema = new Schema(dbObject.schema, this.atomicPriority);


        /*
         * Query Related
         * */
        this.query = new Query(this.ref, this.schema);


        /*
         * Server Related
         * */
        this.server = new Server(this.ref);

        /*
         * Atomic File Related
         * */
        this.atomicFile = new AtomicFile2(this.ref);
    }


    /*
     * AtomicArray
     * */

    public getArrayInstance(): any {
        return new AtomicArray(this);
    }


    /*
    * Query Based Methods
    * */
    public create(record: any): Promise<any> {
        return this
            .query
            .create(record);
    }

    public update(record: any): Promise<any> {
        return this
            .query
            .update(record);
    }

    public remove(record: any): Promise<any> {
        return this
            .query
            .remove(record);
    }

    public upload(file:any){ 
        return this.atomicFile.upload(file);
    }
}


/**
 * Created by jessdotjs on 22/06/17.
 */
import {RefRegistrator} from './RefRegistrator' ;
import {AtomicPriority} from './AtomicPriority';
import {Schema} from './Schema';
import {Query} from './Query';
import {AtomicFile2} from './AtomicFile2';





export class AtomicEntity {
    public ref: any;
    public atomicPriority: any;
    public schema: any;
    public query: any;
    public atomicFile: any;

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
         * Atomic File Related
         * */
        this.atomicFile = new AtomicFile2(this.ref);
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


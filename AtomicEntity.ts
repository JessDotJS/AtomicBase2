/**
 * Created by jessdotjs on 22/06/17.
 */
import {RefRegistrator} from './RefRegistrator' ;
import {Schema} from './Schema';
import {AtomicPriority} from './AtomicPriority';
import {Query} from './Query';
import {Server} from './Server';
import {AtomicArray} from './AtomicArray';
import {AtomicObject} from './AtomicObject';
import {AtomicFile} from './AtomicFile';
import {AtomicAuth} from './AtomicAuth';
import {AtomicMessaging} from './AtomicMessaging';




export class AtomicEntity {
    public ref: any;
    public atomicPriority: any;
    public schema: any;
    public query: any;
    public server: any;
    public atomicFile: any;
    public atomicAuth: any;
    public atomicMessaging: any;

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
        this.atomicFile = new AtomicFile();

        /*
         * Atomic Auth Related
         * */
        this.atomicAuth = new AtomicAuth();

        /*
         * Atomic Messaging Related
         * */
        this.atomicMessaging = new AtomicMessaging();
    }


    /*
     * AtomicArray
     * */

    public getArrayInstance(): any {
        return new AtomicArray(this);
    }

    /*
     * AtomicObject
     * */

    public getObjectInstance(): any {
        return new AtomicObject(this);
    }

    /*
    * Query Based Methods
    * */
    public create(record: any): Promise<any> {
        return this
            .query
            .create(record);
    }

    public createWithCustomKey(record: any, customKey: string): Promise<any> {
        return this
            .query
            .createWithCustomKey(record, customKey);
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


    /*
    * Storage Methods
    * */
    public uploadFile(file: any, ref: string, config?: any): any{
        return this.atomicFile.upload(file, ref, config);
    }

    public deleteFile(ref: string): Promise<any>{
        return this.atomicFile.deleteFile(ref);
    }
}


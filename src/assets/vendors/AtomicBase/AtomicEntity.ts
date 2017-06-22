/**
 * Created by jessdotjs on 22/06/17.
 */
import { Database } from './Database';





export class AtomicEntity {
    public db: any;
    constructor(dbObject: any) {

        this.db = new Database(dbObject);


    }


}


import { Database } from "./Database";
import firebase = require("firebase");

export class AtomicObject {

    public db: Database;
    public item: any; // I cant figure out the type of this.
    public eventListenerRef: EventListener;
    public objectRef: firebase.database.Reference;

    constructor(db: Database, objectRef: firebase.database.Reference){
        this.db = db;
        this.item = {};
        this.objectRef = this.db.ref.root.child();
    }
}

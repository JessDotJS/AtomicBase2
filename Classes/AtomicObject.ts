import { Database } from "./Database";
import firebase = require("firebase");

export class AtomicObject {

    public db: Database;
    public item: any; // I cant figure out the type of this.
    public eventListenerRef: EventListener; // I assume this is the type here.
    public objectRef: firebase.database.Reference;
    private id: string;

    constructor(db: Database, objectRef: firebase.database.Reference) {
        this.db = db;
        this.item = {};
        this.objectRef = this.db.ref.root.child() || this.db.ref.primary;
    }

    public on(): Promise<string> {
        this.id = "";
        let executor: (resolve: (value?: string | PromiseLike<string>) => void, reject: (reason: any) => void) => void;
        executor = (resolve, reject) => {
            this.db.server
                .getLatestTS()
                .then((serverTS: any) => {
                    this.objectRef.once("value", (snapshot: any) => {
                        this.item = this.db.schema.build("snapshot", snapshot);
                        this.id = this.generateInstanceID();
                        resolve(this.id);
                    });
                });
        };
        return new Promise<string>(executor);
    }

    public generateInstanceID(): string {
        return "";
    }
}

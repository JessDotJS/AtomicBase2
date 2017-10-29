/**
 * Created by jessdotjs on 23/06/17.
 */

import { Querybase } from 'querybase';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class AtomicArray {
    // Ref to be retrieved & Listened to
    private ref: any;
    private eventListenerRef: any;

    // AtomicArray Dependencies
    private schema: any;
    private server: any;
    private atomicPriority: any;

    // Subscription to Event Listeners
    private subscribed: boolean;

    // AtomicArray's Synchronized Array
    public items: any[];
    public list : BehaviorSubject<any>;

    // InfiniteArray Related
    private firstLotSize: number;
    private nextLotSize: number;

    public initialLotLoaded: boolean;
    public itemsRemaining: boolean;
    public fetching: boolean;




    constructor (atomicModule: any) {
        this.schema = atomicModule.schema;
        this.server = atomicModule.server;
        this.atomicPriority = atomicModule.atomicPriority;

        this.subscribed = false;
        this.items = [];
        this.list = new BehaviorSubject(this.items);
    }

    /*
     * on
     * @Params:
     * ref: Database Reference
     * config:
     *   type: infinite || query
     *   firstLotSize: number or defaults to 10
     *   nextLotSize: number or defaults to 10
     * */
    public on(ref: any, config?: any): Promise<any> {
        const self = this;

        // Set Defaults
        this.initialLotLoaded = false;
        this.itemsRemaining = false;
        this.fetching = false;

        if(config === undefined) {
            this.firstLotSize = 99999;
            this.nextLotSize = 99999;
        }else {
            this.firstLotSize = config.firstLotSize || 99999;
            this.nextLotSize = config.nextLotSize || 99999;
        }

        if(config !== undefined && config.where !== undefined && config.where !== null) {
            this.ref = new Querybase(ref, []);
            return this.loadQuery(config.where);
        } else if(config !== undefined &&  config.fullSync !== undefined && config.fullSync !== null && config.fullSync === true) {
            this.ref = ref;
            return this.loadFullSync();
        } else{
            this.ref = ref;
            return this.loadFirstLot(config);
        }
    }

    public off(): void {
        this.unsubscribe();

        this.initialLotLoaded = false;
        this.itemsRemaining = false;
        this.fetching = false;

        this.items = [];
    }


    /*
     * Full sync
     *
     * It will maintain a synced array with the database
     * */
    private loadFullSync(): Promise<any> {
        this.fetching = true;
        this.eventListenerRef = this.ref;

        return new Promise((resolve, reject) => {
            this.eventListenerRef.on('value', (snapshot) => {
                this.fetching = false;
                this.initialLotLoaded = true;
                this.subscribed = true;
                this.processFullSnapshot(snapshot);
                resolve(true);
            });
        });
    }


    /*
     * Load records using QueryBase
     *
     * Available Queries
     * querybaseRef.where('name').startsWith('da');
     * querybaseRef.where('age').lessThan(30);
     * querybaseRef.where('age').greaterThan(20);
     * querybaseRef.where('age').between(20, 30);
     * */
    private loadQuery(where: any): Promise<any> {
        this.fetching = true;
        return new Promise((resolve, reject) => {
            let key: string;
            /*
            * Loop through where object
            * */
            for (key in where) {
                if (!where.hasOwnProperty(key)) continue;
                if(typeof where[key] === 'object'){
                    let subKey: string;
                    for (subKey in where[key]) {
                        // Build the where statement
                        this.eventListenerRef =
                            this.ref.where(key)[subKey](where[key][subKey]);
                        resolve(true);
                    }
                }else{
                    this.eventListenerRef = this.ref.where(where[key]);
                    resolve(true);
                }
            }

            /*
            * Register Event Listener
            * */
            this.eventListenerRef.on('value', (snapshot) => {
                this.fetching = false;
                this.initialLotLoaded = true;
                this.subscribed = true;
                this.processFullSnapshot(snapshot);
                resolve(true);
            });
        });
    }

    /*
     * Load First Lot Array
     * */
    private loadFirstLot(config: any): Promise<any> {

        const self = this;
        return new Promise(function(resolve, reject){
            self.fetching = true;
            // Retrieve Initial Lot of records
            self.ref
                .limitToFirst(self.firstLotSize)
                .once('value', function(snapshot){
                    // Get latest server timestamp
                    self.server.serverTimestamp()
                        .then(function(serverTS){

                            // Set event listener ref
                            self.eventListenerRef =
                                self.ref
                                    .orderByChild('latestServerTS')
                                    .startAt(serverTS);

                            // Toggle loading property
                            self.initialLotLoaded = true;

                            // Subscribe to ref event listeners
                            self.subscribe();

                            // Process Snapshot
                            self.processSnapshot(snapshot);

                            self.fetching = false;

                            resolve(true);
                        })
                        .catch(function(err){reject(err); console.log(err);});
                }, function(err){
                    reject(err);
                    console.log(err);
                })
        });
    }

    public loadNext(): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject){

            if(!self.fetching && self.items[self.items.length - 1] != undefined){

                self.fetching = true;
                const nextLotRef =
                    self.ref
                        .startAt(self.items[self.items.length - 1].$priority + 1)
                        .limitToFirst(self.nextLotSize);

                nextLotRef.once('value').then(function(snapshot) {
                    // Process the snapshot
                    self.processSnapshot(snapshot);

                    // Resolve after 1.5 seconds to prevent load spam on infinite scrolling
                    setTimeout(function(){
                        self.fetching = false;
                        resolve(true);
                    }, 1500);
                }).catch(function(err){
                    reject(err);
                });
            }else {
                resolve(false);
            }
        });
    }

    /*
     * Subscribers
     * */
    private subscribe (): void {
        const self = this;
        self.subscribed = true;
        self.eventListenerRef.on('child_added', function(snapshot) {
            // console.log('child_added');
            self.addItem(snapshot, true);
        });

        self.eventListenerRef.on('child_changed', function(snapshot) {
            // console.log('child_changed');
            self.editItem(snapshot);
        });

        self.eventListenerRef.on('child_moved', function(snapshot) {
            // console.log('child_moved');
            self.editItem(snapshot);
        });

        self.eventListenerRef.on('child_removed', function(snapshot) {
            // console.log('child_removed');
            self.removeItem(snapshot);
        });
    }

    public unsubscribe(): void {
        const self = this;
        if(self.subscribed){
            self.eventListenerRef.off('child_added');
            self.eventListenerRef.off('child_changed');
            self.eventListenerRef.off('child_moved');
            self.eventListenerRef.off('child_removed');
            self.eventListenerRef.off();
            self.subscribed = false;
        }
    }




    /*
    * Full Snapshot Processor
    * */
    private processFullSnapshot(snapshot: any): void {
        let items: any[] = [];
        snapshot.forEach( (item) => {
            let atomicObject = this.schema.build(item, 'atomicObject');
            items.push(atomicObject);
        });
        //this.sortArray();
        this.list.next(items);
    }


    /*
     * Snapshot Processor
     * */

    private processSnapshot(snapshot: any): void {
        const self = this;
        snapshot.forEach(function(item){
            self.addItem(item, false);
        });
    }


    /*
     * Array Handlers
     * */
    private addItem(snapshot: any, isNew: boolean): void {
        if(!this.itemExists(snapshot)){
            let atomicObject = this.schema.build(snapshot, 'atomicObject');
            if(isNew)atomicObject._isNew = true;
            this.items.push(atomicObject);
            this.sortArray();
            this.list.next(this.items.slice());
        }
    }

    private editItem(snapshot: any): void {
        let atomicObject = this.schema.build(snapshot, 'atomicObject');
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].$key == atomicObject.$key){
                this.items[i] = atomicObject;
                this.sortArray();
            }
        }
        this.list.next(this.items.slice());
    }

    private removeItem(snapshot: any): void {
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].$key == snapshot.key){
                this.items.splice(i, 1);
                this.sortArray();
            }
        }
        this.list.next(this.items.slice());
    }


    private itemExists(snapshot: any): boolean {
        let exists: boolean = false;
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].$key == snapshot.key){
                exists = true;
            }
        }
        return exists;
    }


    /*
     * Array Sorting
     * */

    private sortArray(): void {
        this.items.sort(this.sortByPriority);
    }

    private sortByPriority(a: any, b: any): any {
        return a.$priority - b.$priority;
    }
}

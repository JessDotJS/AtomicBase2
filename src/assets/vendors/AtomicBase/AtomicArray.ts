/**
 * Created by jessdotjs on 23/06/17.
 */

export class AtomicArray {
    /*
     * Type of AtomicArray
     * a) infinite - For infinite Scrolling + Pagination
     * b) query - For search queries using QueryBase
     * */
    private type: string;

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
    public on(ref: any, config: any): Promise<any> {
        // Init ref
        this.ref = ref;

        // infinite(config) or query(config)
        return this[config.type](config);
    }


    /*
     * Infinite Array
     * */
    private infinite(config: any): Promise<any> {
        // Set Defaults
        this.initialLotLoaded = false;
        this.itemsRemaining = false;
        this.fetching = false;

        this.firstLotSize = config.firstLotSize || 10;
        this.nextLotSize = config.nextLotSize || 10;

        const self = this;
        return new Promise(function(resolve, reject){
            self.fetching = true;
            // Retrieve Initial Lot of records
            self.ref
                .limitToFirst(5)
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


    private query(): Promise<any> {
        return new Promise(function(resolve, reject){
            resolve(true);
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

                    // Resolve after 5 seconds to prevent load spam on infinite scrolling
                    setTimeout(function(){
                        self.fetching = false;
                        resolve(true);
                    }, 5000);
                }).catch(function(err){
                    reject(err);
                });
            }else {
                resolve(false);
            }
        });
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
     * Subscribers
     * */
    private subscribe (): void {
        const self = this;
        self.subscribed = true;
        self.eventListenerRef.on('child_added', function(snapshot) {
            console.log('child_added');
            self.addItem(snapshot, true);
        });

        self.eventListenerRef.on('child_changed', function(snapshot) {
            console.log('child_changed');
            self.editItem(snapshot);
        });

        self.eventListenerRef.on('child_moved', function(snapshot) {
            console.log('child_moved');
            self.editItem(snapshot);
        });

        self.eventListenerRef.on('child_removed', function(snapshot) {
            console.log('child_removed');
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
            self.subscribed = false;
        }
    }


    /*
     * Array Handlers
     * */
    private addItem(snapshot: any, isNew: boolean): void {
        const self = this;
        if(!self.itemExists(snapshot)){
            let atomicObject = self.schema.build(snapshot, 'atomicObject');
            if(isNew)atomicObject._isNew = true;
            self.items.push(atomicObject);
            self.sortArray();
        }
    }

    private editItem(snapshot: any): void {
        const self = this;
        let atomicObject = self.schema.build(snapshot, 'atomicObject');
        for(let i = 0; i < self.items.length; i++){
            if(self.items[i].$key == atomicObject.$key){
                self.items[i] = atomicObject;
                self.sortArray();
            }
        }
    }

    private removeItem(snapshot: any): void {
        const self = this;
        for(let i = 0; i < self.items.length; i++){
            if(self.items[i].$key == snapshot.key){
                self.items.splice(i, 1);
                self.sortArray();
            }
        }
    }


    private itemExists(snapshot: any): boolean {
        const self = this;
        let exists: boolean = false;
        for(let i = 0; i < self.items.length; i++){
            if(self.items[i].$key == snapshot.key){
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
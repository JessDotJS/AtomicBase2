"use strict";
/**
 * Created by jessdotjs on 23/06/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var querybase_1 = require("querybase");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AtomicArray = /** @class */ (function () {
    function AtomicArray(atomicModule) {
        this.schema = atomicModule.schema;
        this.server = atomicModule.server;
        this.atomicPriority = atomicModule.atomicPriority;
        this.subscribed = false;
        this.items = [];
        this.list = new BehaviorSubject_1.BehaviorSubject(this.items);
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
    AtomicArray.prototype.on = function (ref, config) {
        var self = this;
        // Set Defaults
        this.initialLotLoaded = false;
        this.itemsRemaining = false;
        this.fetching = false;
        if (config === undefined) {
            this.firstLotSize = 99999;
            this.nextLotSize = 99999;
        }
        else {
            this.firstLotSize = config.firstLotSize || 99999;
            this.nextLotSize = config.nextLotSize || 99999;
        }
        if (config !== undefined && config.where !== undefined && config.where !== null) {
            this.ref = new querybase_1.Querybase(ref, []);
            return this.loadQuery(config.where);
        }
        else if (config !== undefined && config.fullSync !== undefined && config.fullSync !== null && config.fullSync === true) {
            this.ref = ref;
            return this.loadFullSync();
        }
        else {
            this.ref = ref;
            return this.loadFirstLot(config);
        }
    };
    AtomicArray.prototype.off = function () {
        this.unsubscribe();
        this.initialLotLoaded = false;
        this.itemsRemaining = false;
        this.fetching = false;
        this.items = [];
    };
    /*
     * Full sync
     *
     * It will maintain a synced array with the database
     * */
    AtomicArray.prototype.loadFullSync = function () {
        var _this = this;
        this.fetching = true;
        this.eventListenerRef = this.ref;
        return new Promise(function (resolve, reject) {
            _this.eventListenerRef.on('value', function (snapshot) {
                _this.fetching = false;
                _this.initialLotLoaded = true;
                _this.subscribed = true;
                _this.processFullSnapshot(snapshot);
                resolve(true);
            });
        });
    };
    /*
     * Load records using QueryBase
     *
     * Available Queries
     * querybaseRef.where('name').startsWith('da');
     * querybaseRef.where('age').lessThan(30);
     * querybaseRef.where('age').greaterThan(20);
     * querybaseRef.where('age').between(20, 30);
     * */
    AtomicArray.prototype.loadQuery = function (where) {
        var _this = this;
        this.fetching = true;
        return new Promise(function (resolve, reject) {
            var key;
            /*
            * Loop through where object
            * */
            for (key in where) {
                if (!where.hasOwnProperty(key))
                    continue;
                if (typeof where[key] === 'object') {
                    var subKey = void 0;
                    for (subKey in where[key]) {
                        // Build the where statement
                        _this.eventListenerRef =
                            _this.ref.where(key)[subKey](where[key][subKey]);
                        resolve(true);
                    }
                }
                else {
                    _this.eventListenerRef = _this.ref.where(where[key]);
                    resolve(true);
                }
            }
            /*
            * Register Event Listener
            * */
            _this.eventListenerRef.on('value', function (snapshot) {
                _this.fetching = false;
                _this.initialLotLoaded = true;
                _this.subscribed = true;
                _this.processFullSnapshot(snapshot);
                resolve(true);
            });
        });
    };
    /*
     * Load First Lot Array
     * */
    AtomicArray.prototype.loadFirstLot = function (config) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.fetching = true;
            // Retrieve Initial Lot of records
            self.ref
                .limitToFirst(self.firstLotSize)
                .once('value', function (snapshot) {
                // Get latest server timestamp
                self.server.serverTimestamp()
                    .then(function (serverTS) {
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
                    .catch(function (err) { reject(err); console.log(err); });
            }, function (err) {
                reject(err);
                console.log(err);
            });
        });
    };
    AtomicArray.prototype.loadNext = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (!self.fetching && self.items[self.items.length - 1] != undefined) {
                self.fetching = true;
                var nextLotRef = self.ref
                    .startAt(self.items[self.items.length - 1].$priority + 1)
                    .limitToFirst(self.nextLotSize);
                nextLotRef.once('value').then(function (snapshot) {
                    // Process the snapshot
                    self.processSnapshot(snapshot);
                    // Resolve after 1.5 seconds to prevent load spam on infinite scrolling
                    setTimeout(function () {
                        self.fetching = false;
                        resolve(true);
                    }, 1500);
                }).catch(function (err) {
                    reject(err);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    /*
     * Subscribers
     * */
    AtomicArray.prototype.subscribe = function () {
        var self = this;
        self.subscribed = true;
        self.eventListenerRef.on('child_added', function (snapshot) {
            // console.log('child_added');
            self.addItem(snapshot, true);
        });
        self.eventListenerRef.on('child_changed', function (snapshot) {
            // console.log('child_changed');
            self.editItem(snapshot);
        });
        self.eventListenerRef.on('child_moved', function (snapshot) {
            // console.log('child_moved');
            self.editItem(snapshot);
        });
        self.eventListenerRef.on('child_removed', function (snapshot) {
            // console.log('child_removed');
            self.removeItem(snapshot);
        });
    };
    AtomicArray.prototype.unsubscribe = function () {
        var self = this;
        if (self.subscribed) {
            self.eventListenerRef.off('child_added');
            self.eventListenerRef.off('child_changed');
            self.eventListenerRef.off('child_moved');
            self.eventListenerRef.off('child_removed');
            self.eventListenerRef.off();
            self.subscribed = false;
        }
    };
    /*
    * Full Snapshot Processor
    * */
    AtomicArray.prototype.processFullSnapshot = function (snapshot) {
        var _this = this;
        var items = [];
        snapshot.forEach(function (item) {
            var atomicObject = _this.schema.build(item, 'atomicObject');
            items.push(atomicObject);
        });
        //this.sortArray();
        this.list.next(items);
    };
    /*
     * Snapshot Processor
     * */
    AtomicArray.prototype.processSnapshot = function (snapshot) {
        var self = this;
        snapshot.forEach(function (item) {
            self.addItem(item, false);
        });
    };
    /*
     * Array Handlers
     * */
    AtomicArray.prototype.addItem = function (snapshot, isNew) {
        if (!this.itemExists(snapshot)) {
            var atomicObject = this.schema.build(snapshot, 'atomicObject');
            if (isNew)
                atomicObject._isNew = true;
            this.items.push(atomicObject);
            this.sortArray();
            this.list.next(this.items.slice());
        }
    };
    AtomicArray.prototype.editItem = function (snapshot) {
        var atomicObject = this.schema.build(snapshot, 'atomicObject');
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].$key == atomicObject.$key) {
                this.items[i] = atomicObject;
                this.sortArray();
            }
        }
        this.list.next(this.items.slice());
    };
    AtomicArray.prototype.removeItem = function (snapshot) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].$key == snapshot.key) {
                this.items.splice(i, 1);
                this.sortArray();
            }
        }
        this.list.next(this.items.slice());
    };
    AtomicArray.prototype.itemExists = function (snapshot) {
        var exists = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].$key == snapshot.key) {
                exists = true;
            }
        }
        return exists;
    };
    /*
     * Array Sorting
     * */
    AtomicArray.prototype.sortArray = function () {
        this.items.sort(this.sortByPriority);
    };
    AtomicArray.prototype.sortByPriority = function (a, b) {
        return a.$priority - b.$priority;
    };
    return AtomicArray;
}());
exports.AtomicArray = AtomicArray;
//# sourceMappingURL=AtomicArray.js.map
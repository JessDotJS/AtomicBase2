/**
 * Created by jessdotjs on 23/06/17.
 */

import { Querybase } from 'querybase';


export class AtomicObject {
    // Ref to be retrieved & Listened to
    private ref: any;
    private eventListenerRef: any;

    // AtomicArray Dependencies
    private schema: any;

    // AtomicArray's Synchronized Array
    public item: any;


    public loaded: boolean;




    constructor (atomicModule: any) {
        this.schema = atomicModule.schema;

        this.loaded = false;
        this.item = {};
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
    public on(ref: any): Promise<any> {
        const self = this;

        self.eventListenerRef = ref;

        return new Promise(function(resolve, reject){
            self.eventListenerRef.on('value', function(snapshot){
                self.item = self.schema.build(snapshot, 'atomicObject');
                self.loaded = true;
                resolve(true);
            });
        });
    }

    public off(): void {
        this.eventListenerRef.off('value');
    }
}

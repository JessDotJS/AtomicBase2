/**
 * Created by jessdotjs on 22/06/17.
 */
import {AtomicEntity} from '../../assets/vendors/AtomicBase/AtomicEntity';




export class Task extends AtomicEntity {

    constructor() {
        super({

            refs: {

                primary: 'tasks/all'
            },

            schema: {
                primary: {
                    title: {
                        value: '='
                    },
                    description: {
                        value: '='
                    }
                }
            }

        });


    }

}


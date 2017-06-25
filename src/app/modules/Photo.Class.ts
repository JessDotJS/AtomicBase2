/**
 * Created by jessdotjs on 22/06/17.
 */
import {AtomicEntity} from '../../assets/vendors/AtomicBase/AtomicEntity';




export class Photo extends AtomicEntity {

    constructor() {
        super({

            refs: {
                primary: 'photos/all'
            },

            schema: {
                primary: {
                    name: {
                        value: '='
                    },
                    url: {
                        value: '='
                    }
                },
                priority: {
                    order: 'dateDesc'
                }
            }

        });


    }



    public deletePhoto(item: any): Promise<any> {
        const self = this;

        return new Promise(function(resolve, reject){
            self.atomicFile.deleteFile('photos/' + item.name)
                .then(function(){
                    self.remove(item)
                        .then(function(){
                            resolve(true);
                        })
                        .catch(function(err){reject(err);});
                })
                .catch(function(err){reject(err);});
        });
    }
}


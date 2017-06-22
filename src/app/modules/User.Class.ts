/**
 * Created by jessdotjs on 22/06/17.
 */
import {AtomicEntity} from '../../assets/vendors/AtomicBase/AtomicEntity';





export class User extends AtomicEntity {

    constructor() {

        super({

            refs: {

                primary: 'users/all',

                secondary: function(user){
                    const self = this;
                    self.objectEntity = user;
                    return new Promise(function(resolve, reject){
                        // In this case, the admin user node
                        resolve([
                            'users' + '/' + user.type + '/' + user.$key
                        ]);
                    });
                },
                foreign: function(user){
                    return new Promise(function(resolve, reject){
                        resolve([
                            'favoritePeople/' + user.$key,
                        ]);
                    });
                }
            },

            schema: {
                primary: {
                    name: {
                        value: '='
                    },
                    type: {
                        value: '='
                    },
                    age: {
                        value: '='
                    }
                },
                secondary: {
                    name: {
                        value: '='
                    },
                    age: {
                        value: '='
                    }
                },
                foreign: {
                    name: {
                        value: '='
                    }
                },

                priority: {
                    order: 'dateDesc'
                }
            }

        });


    }

}


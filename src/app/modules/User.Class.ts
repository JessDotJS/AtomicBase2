/**
 * Created by jessdotjs on 22/06/17.
 */
import { Database } from '../../assets/vendors/AtomicBase/Database';
import {AtomicEntity} from '../../assets/vendors/AtomicBase/AtomicEntity';





export class User extends AtomicEntity {
    public db: any;
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
                            'post/comments/COMMENT_KEY/' + user.type,
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
                        value: '=',
                        default: 0
                    }
                },
                secondary: {
                    name: {
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


/**
 * Created by jessdotjs on 22/06/17.
 */
import {AtomicEntity} from '../../assets/vendors/AtomicBase/AtomicEntity';
import * as firebase from 'firebase';




export class User extends AtomicEntity {
    public rootRef: any;

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
                            'users/' + user.type + '/' + user.$key
                        ]);
                    });
                },
                foreign: function(user){
                    const self = this;
                    return new Promise(function(resolve, reject){
                        // Check if it is favorite
                        firebase.database().ref()
                            .child('favoritePeople/' + user.$key)
                            .once('value')
                            .then(function(snapshot){
                                if(snapshot.exists()){
                                    resolve([
                                        'favoritePeople/' + user.$key,
                                    ]);
                                }else{
                                    resolve([]);
                                }
                            });

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


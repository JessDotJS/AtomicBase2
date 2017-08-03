/**
 * Created by jessdotjs on 22/06/17.
 */
import {AtomicEntity} from '../AtomicBase2/AtomicEntity';




export class User extends AtomicEntity {

    constructor() {
        super({

            refs: {

                primary: 'users/all',

                secondary: function(user){
                    const self = this;
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
                        self.root
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
                        value: '=',
                        defaultValue: function(user: any): string{
                            return 'Jess Graterol';
                        }
                    },
                    nameSearchable: {
                        value: function(user: any): string{
                            return user.name.toLowerCase();
                        }
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


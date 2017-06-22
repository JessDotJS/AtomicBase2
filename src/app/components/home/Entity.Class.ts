import { Database } from '../../../assets/vendors/AtomicBase/Database';





export class Entity {
    public db: any;
    constructor(PrimaryPath: string, SecundaryPath: string, ForeignPath?: string) {

        this.db = new Database({
            // Ref Registrator.
            refs: {
                // Primary Ref
                primary: PrimaryPath, // 'users/all'

                /*
                 * Secondary Refs have 2 purposes:
                 *
                 * 1)When creating a record using SomeClass.db.query.create()
                 * that record will also be created in the secondary refs you
                 * specify
                 *
                 * 2)Multilocation Updates/Deletes
                 * */
                secondary: function(user){
                    /*
                     * The user parameter contains a formatted object
                     * which will allow you to access all properties
                     * specified in the schema plus $key and $priority
                     */
                    const self = this;
                    self.objectEntity = user;
                    return new Promise(function(resolve, reject){
                        // In this case, the admin user node
                        resolve([
                            SecundaryPath + '/' + user.type + '/' + user.$key
                        ]);
                    });
                },


                /*
                 * Foreign Refs are specifically for copies in which creation
                 * didn't happen when the original record was created.
                 * For example: A user commenting on a post
                 * with this structure:
                 * post
                 *   comments
                 *       commentKey
                 *           userKey
                 *               name
                 * */
                /*foreign: function(user){
                 return new Promise(function(resolve, reject){
                 resolve([
                 'post/comments/COMMENT_KEY/' + user.type,
                 ]);
                 });
                 }*/

                /*
                 * Take Away
                 * The reason the secondary & foreign ref objects return a promise
                 * is because to gather all the necessary refs can take queries, etc.
                 * Make sure you set this right since this mechanism will be taking
                 * care of data consistency in your app.
                 * */
            },



            /*
             * IMPORTANT
             * Primary, Secondary & Foreign Refs are not required
             * to have the same properties.
             * */
            schema: {
                primary: {
                    name: {
                        /*
                         * value can take any kind of data, including functions.
                         * In case this data will be provided for sure use '='.
                         * If the value provided is undefined the Atomic Schema will throw an error
                         * unless you have setup the default property.
                         * */
                        value: '='
                    },

                    /*
                     * Imagine a case where you had a property which value depended on another
                     * property. For example, totalBalance = availableBalance + pendingBalance
                     */
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
                        /*
                         * value can take any kind of data, including functions.
                         * In case this data will be provided for sure use '='.
                         * If the value provided is undefined the Atomic Schema will throw an error
                         * unless you have setup the default property.
                         * */
                        value: '='
                    }
                },
                foreign: {
                    name: {
                        value: '='
                    }
                },


                // Default
                priority: {
                    /*
                     * The order priority can take any value including promises
                     * Built-In functionality: dateDesc
                     */
                    order: 'dateDesc'
                }
            }

        });


    }

    build(objectEntity){
        return this.db.schema.build(objectEntity, 'primary');
    }

    create(objectEntity){
        let userObject = this.build(objectEntity);
        console.log(userObject.name);
        this.db.query.create(userObject);
    }

}


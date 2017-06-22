export class Query{
    ref: any;
    schema: any;

    constructor(ref:any, schema:any){
        this.ref = ref;
        this.schema = schema;
    }

    create(atomicObject:any):Promise<any>{

        var self = this;
        let fanoutObject = {};
        let primaryRef = self.ref.root.child(self.ref.primary);
        return new Promise(function(resolve, reject){
            primaryRef.push(self.schema.build(atomicObject, 'primary')).then(function(snapshot){
                atomicObject.$key = snapshot.key;
                if(self.ref.secondary){
                    self.ref.getSecondaryRefs(atomicObject).then(function(secondaryRefs){
                        for(let i = 0; i < secondaryRefs.length; i++){
                            fanoutObject[secondaryRefs[i]] = self.schema.build(atomicObject, 'secondary')
                        }
                        self.processFanoutObject(fanoutObject).then(function(response){
                            resolve(atomicObject.$key);
                        }).catch(function(err){reject(err)});
                    }).catch(function(err){reject(err)});
                }else{
                    resolve(atomicObject.$key);
                }
            }).catch(function(err){reject(err)});
        });
    }

    update(atomicObject:any):Promise<any>{
        var self = this;
        return new Promise(function(resolve, reject){
            self.alter(atomicObject, 'update').then(function(response){
                resolve(true);
            }).catch(function(err){reject(err)});
        });
    }

    remove(atomicObject:any):Promise<any>{
        var self = this;
        return new Promise(function(resolve, reject){
            self.alter(atomicObject, 'update').then(function(response){
                self.alter(atomicObject, 'remove').then(function(response){
                    resolve(response);
                }).catch(function(err){reject(err)});
            }).catch(function(err){reject(err)});
        });
    }

    alter(atomicObject:any, type:any):Promise<any>{


        var self = this;
        let fanoutObject = {};

        let primary;
        let secondary;
        let foreign;

        if(type == 'update'){
            primary = self.schema.build(atomicObject, 'primary');
            secondary = self.schema.build(atomicObject, 'secondary');
            foreign = self.schema.build(atomicObject, 'foreign');
        }else if(type == 'remove'){
            primary = {};
            secondary = {};
            foreign = {};
        }


        return new Promise(function(resolve, reject){
            /*
             * Primary Ref
             * */

            var objectKey;
            if(atomicObject.$key == undefined){
                objectKey = atomicObject.key;
            }else{
                objectKey = atomicObject.$key;
            }

            fanoutObject[self.ref.primary + '/' + objectKey] = primary;

            /*
             * Secondary & Foreign
             * */
            if(self.ref.secondary && self.ref.foreign){
                self.ref.secondary(atomicObject).then(function(secondaryRefs){
                    self.ref.foreign(atomicObject).then(function(foreignRefs){
                        for(let i = 0; i <secondaryRefs.length; i++){
                            fanoutObject[secondaryRefs[i]] = secondary;
                        }
                        for(let i = 0; i < foreignRefs.length; i++){
                            fanoutObject[foreignRefs[i]] = foreign;
                        }
                        self.processFanoutObject(fanoutObject).then(function(response){
                            resolve(response);
                        }).catch(function(err){reject(err)});
                    }).catch(function(err){reject(err)});
                }).catch(function(err){reject(err)});
            }
            /*
             * Secondary & !Foreign
             * */
            else if(self.ref.secondary && !self.ref.foreign){
                self.ref.secondary(atomicObject).then(function(secondaryRefs){
                    for(let i = 0; i <secondaryRefs.length; i++){
                        fanoutObject[secondaryRefs[i]] = secondary;
                    }
                    self.processFanoutObject(fanoutObject).then(function(response){
                        resolve(response);
                    }).catch(function(err){reject(err)});
                }).catch(function(err){reject(err)});
            }

            /*
             * !Secondary & Foreign
             * */
            else if(!self.ref.secondary && self.ref.foreign){
                self.ref.foreign(atomicObject).then(function(foreignRefs){
                    for(let i = 0; i < foreignRefs.length; i++){
                        fanoutObject[foreignRefs[i]] = foreign;
                    }
                    self.processFanoutObject(fanoutObject).then(function(response){
                        resolve(response);
                    }).catch(function(err){reject(err)});
                }).catch(function(err){reject(err)});
            }

            /*
             * !Secondary & !Foreign
             * */
            else{
                self.processFanoutObject(fanoutObject).then(function(response){
                    resolve(response);
                }).catch(function(err){reject(err)});
            }
        });

    }


    processFanoutObject(fanoutObject:any):Promise<any>{
        var self = this;
        return new Promise(function(resolve, reject){
            self.ref.root.update(fanoutObject).then(function(response){
                resolve(response);
            }).catch(function(err){reject(err)});
        });
    }

    set(atomicObject:any):Promise<any>{
        var self = this;
        let fanoutObject = {};
        let primaryRef = self.ref.root.child(self.ref.primary);
        return new Promise(function(resolve, reject){
            primaryRef.set(self.schema.build(atomicObject, 'primary')).then(function(snapshot){
                resolve(true);
            }).catch(function(err){reject(err)});
        });
    }



}



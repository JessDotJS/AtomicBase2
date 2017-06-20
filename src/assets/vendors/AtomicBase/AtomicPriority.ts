/*
* Custom ordering is not recommended for large sets of data
* */

export class AtomicPriority{
	ref:any;
	increment:any;
	orderSelected:any;
	childAdded:any;

	constructor(config:any,ref:any){

	    this.ref = ref;
	    this.increment = 50000000;

	    if(config == undefined){
	        this.orderSelected = 'dateDesc';
	    }else{
	        this.orderSelected = config.order;
	        this.childAdded = config.childAdded || 'last';
	    }
	}

	getPriority(data:any):any{
		var self = this;
	    if(self.orderSelected != undefined){
	        if(self.orderSelected == 'custom'){
	            return new Promise(function(resolve, reject){
	                self[self.childAdded]()
	                	.then(function(defaultPriority){
	                    	resolve(defaultPriority);
	                	})
	                	.catch(function(err){
	                		reject(err)
	                	});
	            });
	        }else if(typeof self.orderSelected == 'function'){
	            return self.orderSelected(data);
	        }else{
	            return self[self.orderSelected]();
	        }
	    }else{
	        return self.dateDesc();
	    }
	}

	dateDesc():any{
    	let currentClientTS = new Date().getTime();
    	return -(currentClientTS);		
	}

	dateAsc():any{
		return new Date().getTime();
	}

	first():Promise<any>{
    	var self = this;
	    let refQuery = self.ref.root.child(self.ref.primary)
	        .orderByPriority()
	        .limitToFirst(1);
	    return new Promise(function(resolve, reject){
	        refQuery.once("value")
	        		.then(function(snapshot){
			            if(snapshot.val()){
			                let priority = 0;
			                snapshot.forEach(function(DataSnapshot) {
			                    priority = DataSnapshot.getPriority();
			                });
			                resolve(priority / 2);
			            }else{
			                resolve(self.increment);
			            }
	        		})
	        		.catch(function(err){
	        			reject(err)
	        		});
	    });

	}

	last():Promise<any>{
	    var self = this;
	    let refQuery = self.ref.root.child(self.ref.primary)
	        .orderByPriority()
	        .limitToLast(1);
	    return new Promise(function(resolve, reject){
	        refQuery.once("value")
	        		.then(function(snapshot){
			            if(snapshot.val()){
			                let priority = 0;
			                snapshot.forEach(function(DataSnapshot) {
			                    priority = DataSnapshot.getPriority();
			                });
			                resolve(priority + self.increment);
			            }else{
			                resolve(self.increment);
			            }
	        		})
	        		.catch(function(err){
	        			reject(err)
	        		});
	    });
	}

	previous(previousItem:any):Promise<any>{
	    var self = this;
	    let refQuery = self.ref.root.child(self.ref.primary)
	        .orderByPriority()
	        .endAt(previousItem.$priority)
	        .limitToLast(2);
	    return new Promise(function(resolve, reject){
	        refQuery.once("value")
	        		.then(function(snapshot){
	            		let acum = 0;
			            snapshot.forEach(function(itemSnapshot){
			                acum += itemSnapshot.getPriority()
			            });
	            		resolve(acum / 2);
	        		})
	        		.catch(function(err){
	        			reject(err)
	        		});
	    });
	}

	next(nextItem:any):Promise<any>{
	    var self = this;
	    let refQuery = self.ref.root.child(self.ref.primary)
	        .orderByPriority()
	        .startAt(nextItem.$priority)
	        .limitToFirst(2);
	    return new Promise(function(resolve, reject){
	        refQuery.once("value")
	        		.then(function(snapshot){
			            let acum = 0;
			            snapshot.forEach(function(itemSnapshot){
			                acum += itemSnapshot.getPriority()
			            });
	            		resolve(acum / 2);
	       			})
	       			.catch(function(err){
	       				reject(err)
	       			});
	    });
	}

	isFirst(item:any):Promise<any>{
	    var self = this;
	    return new Promise(function(resolve, reject){
	        self.first()
	        	.then(function(firstPosition){
		            if(item.$priority == firstPosition){
		                resolve(true)
		            }else{
		                resolve(false)
	            	}
	        	})
	        	.catch(function(err){
	        		reject(err)
	        	});
	    });

	}

	isLast(item:any):Promise<any>{
	    var self = this;
	    return new Promise(function(resolve, reject){
	        self.last()
	        	.then(function(lastPosition){
		            if(item.$priority == lastPosition){
		                resolve(true)
		            }else{
		                resolve(false)
		            }
		        })
	        	.catch(function(err){
	        		reject(err)
	        	});
	    });
	}


}
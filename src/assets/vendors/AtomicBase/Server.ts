import * as firebase from 'firebase';

export class Server{
	serverRef:any;
	constructor(refObject){
		this.serverRef = refObject.root.child('atomicBase/server');
	}

	updateTS():Promise<any>{
	    var self = this;
	    return new Promise(function(resolve, reject){
	        self.serverRef.set({TS: firebase.database.ServerValue.TIMESTAMP})
	            .then(function(response){
	                resolve(response);
	            }).catch(function(err){
	            	reject(err);
	            });
	    });
	}

	getTS():Promise<any>{
	    var self = this;
	    return new Promise(function(resolve, reject){
	        self.serverRef.once("value")
	            .then(function(snapshot){
	                resolve(snapshot.val().TS);
	            }).catch(function(err){
	            	reject(err);
	            });
    	});
	}

	getLatestTS():Promise<any>{
	    var self = this;
	    return new Promise(function(resolve, reject){
	        self.updateTS()
	            .then(function(snapshot){
	                self.getTS()
	                    .then(function(serverTS){
	                        resolve(serverTS);
	                    })
	                    .catch(function(err){
	                    	reject(err);
	                    });
	            }).catch(function(err){
	            	reject(err);
	            });
	    });		
	}


}


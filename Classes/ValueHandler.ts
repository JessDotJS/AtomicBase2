/*
 * Value Handler
 * */
 export class ValueHandler{
 	default:any;
 	constructor(){
 		this.default = null;
 	}
 	getValue(value:any, data:any):any{
	    var self = this;
	    let foundVal = null;
	    let valueType = typeof value;
	    if(value != undefined){
	        if(valueType == 'string' || valueType == 'number' || valueType == 'object' || valueType == 'boolean'){
	            return self.handleNormal(value, data);
	        }else if(valueType == 'function'){
	            return self.handleFunction(value, data);
	        }
	    }else{
	        return self.default
	    }
 	}
 	handleNormal(value:any, data:any):any{
 		var self = this;
	    if(value == undefined){
	        value = self.default;
	    }
	    return value;
 	}
 	handleFunction(value:any, data:any){
 		var self = this;
	     if(value(data) == undefined){
	        value = self.default;
	    }
	    return value(data);
 	}

}
import {SchemaUtilities} from './SchemaUtilities';
import {ValueHandler} from './ValueHandler';
import firebase = require("firebase");

/*
* Schema initialization
*
* @param - Schema Object & atomicPriority
* */


export class Schema {

	atomicPriority:any;
	primary:any;
	secondary:any;
	foreign:any;
	constructor(schema:any,atomicPriority:any){
	    if(schema != undefined && schema != null){
	        let schemaUtilities = new SchemaUtilities();

	        this.atomicPriority = atomicPriority;

	        //Build Schema Configuration Objects
	        this.primary = schemaUtilities.retrieveConfiguration(schema.primary);
	        this.secondary = schemaUtilities.retrieveConfiguration(schema.secondary);
	        this.foreign = schemaUtilities.retrieveConfiguration(schema.foreign);
	    }else{
	        throw "There was an error in your schema object.Schema couldn't initialize.";
	    }		
	}

	/*
	* Build
	*
	 * @params
	 * data - an afObject coming from snapshot build
	 * type - available options: snapshot, primary, secondary & foreign
	 * @returns - proper formatted object with desired schema
	* */

	build(data:any,type:any):any{
	    var self = this;
	        let properties:any;
	        if(type == 'snapshot'){
	            properties = data.val();
	        }else{
	            properties = data;
	        }
	        if(self.getDefaults(data, type).then == undefined){
	            return self.buildSchemaProperties(self.getDefaults(data, type), properties, type);
	        }else{
	            return new Promise(function(resolve, reject){
	                self.getDefaults(data, type)
	                	.then(function(defaults){
	                    	resolve(self.buildSchemaProperties(defaults, properties, type));
	                	})
	                	.catch(function(err){
	                		reject(err)
	                	})
	            });
	        }
	}

	/*
	 * Build Schema Properties
	 *
	 * @params
	 * defaults - default object properties
	 * data - an afObject coming from snapshot build
	 * type - available options: snapshot, primary, secondary & foreign
	 * @returns - final schema object
	 * */	

	buildSchemaProperties(defaults:any, data:any, type:any):any{

	    var self = this;
	    let dataObject = defaults;
	    let selfSchema:any;
	    if(type == 'snapshot'){
	        selfSchema = self['primary'];
	        type = 'primary';
	    }else{
	        selfSchema = self[type];
	    }
	    for (let key in selfSchema) {
	        if (!selfSchema.hasOwnProperty(key)) continue;
	        dataObject[key] = self.getPropertyValue({
	            key: key,
	            value: data[key]
	        }, data, type);
	    }
	    return dataObject;

	}

	/*
	 * Get Property Value
	 *
	 * @params
	 * propertyObject - default object properties
	 * propertiesData - an afObject coming from snapshot build
	 * type - available options: snapshot, primary, secondary & foreign
	 * @returns - final schema object
	 * */

	getPropertyValue(propertyObject:any, propertiesData:any, type:any):any{

	    var self = this;
	    let valueHandler = new ValueHandler();
	    let dataValue:any;

	    if(self[type][propertyObject.key].value == '='){
	        dataValue = valueHandler.getValue(propertyObject.value, propertiesData);
	        if(dataValue == undefined || dataValue == null){
	            dataValue = valueHandler.getValue(self[type][propertyObject.key].default, propertiesData);
	        }
	    }else{
	        dataValue = valueHandler.getValue(self[type][propertyObject.key].value, propertiesData);
	        if(dataValue == undefined || dataValue == null){
	            valueHandler.getValue(self[type][propertyObject.key].default, propertiesData);
	        }
	    }
	    return dataValue;

	}
	/*
	 * Get Defaults
	 *
	 * @params
	 * data - an afObject coming from snapshot build
	 * type - available options: snapshot, primary, secondary & foreign
	 * @returns - proper formatted object with desired schema defaults
	 * */

	getDefaults(data:any, type:any):any{
	     var self = this;
	    if(self.atomicPriority.order == 'custom'){
	        return new Promise(function(resolve, reject){
	            self.atomicPriority.getPriority(data)
	            	.then(function(defaultPriority){
	                	resolve(self.default[type](data, defaultPriority));
	           		})
	            	.catch(function(err){
	            		reject(err)})
	        });
	    }else{
	        return self.default[type](data, self.atomicPriority.getPriority(data));
	    }		
 	}

	/*
	 * Default.type
	 *
	 * @params
	 * data - an afObject coming from snapshot build
	 * defaultPriority - predetermined priority of the item
	 * type - available options: snapshot, primary, secondary & foreign
	 * @returns - final schema object
	 * */

 	default ={

	    snapshot: function(data:any, defaultPriority:any):any{
	        if(data.exists()){
	            return {
	                $key: data.$key || data.key,
	                creationTS: data.val().creationTS,
	                lastEventTS: data.val().lastEventTS,
	                latestServerTS: data.val().latestServerTS,
	                $priority: data.getPriority() || defaultPriority
	            }
	        }else{
	            return {};
	        }

	    },
	    primary: function(data:any, defaultPriority:any):any{
	        if(data != undefined && data != null){
	            let currentClientTS = new Date().getTime();
	            return {
	                creationTS: data.creationTS || currentClientTS,
	                lastEventTS: currentClientTS,
	                latestServerTS: firebase.database.ServerValue.TIMESTAMP,
	                '.priority': data.$priority  || defaultPriority
	            }
	        }else{
	            return {};
	        }

	    },
	    secondary: function(data:any, defaultPriority:any):any{
	        if(data != undefined && data != null){
	            let currentClientTS = new Date().getTime();
	            return {
	                creationTS: data.creationTS || currentClientTS,
	                lastEventTS: currentClientTS,
	                latestServerTS: firebase.database.ServerValue.TIMESTAMP,
	                '.priority': data.$priority  || defaultPriority
	            }
	        }else{
	            return {};
	        }

	    },
	    foreign: function(data:any, defaultPriority:any):any{
	        if(data != undefined && data != null){
	            let currentClientTS = new Date().getTime();
	            return {
	                key: data.$key || data.key,
	                creationTS: data.creationTS || currentClientTS,
	                lastEventTS: currentClientTS,
	                latestServerTS: firebase.database.ServerValue.TIMESTAMP,
	                '.priority': data.$priority  || defaultPriority
	            }
	        }else{
	            return {};
	        }
	    }
	}



}

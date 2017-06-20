export class SchemaUtilities{
	retrieveConfiguration(schema:any):any{
	    let schemaObject = {};
	    if(schema){
	        for (let key in schema) {
	            if (!schema.hasOwnProperty(key)) continue;
	            schemaObject[key] = schema[key];
	        }
	    }else{
	        return schemaObject = false;
	    }
	    return schemaObject;
	}
}
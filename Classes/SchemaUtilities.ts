import {Schema} from "./Schema";

export class SchemaUtilities {

	public retrieveConfiguration(schema: Schema): Schema {
		let schemaObject: Schema = {};
		if(schema){
			for (let key in schema) {
				if(!schema.hasOwnProperty(key)) continue;
				schemaObject[key] = schema[key];
			}
		}else{
			return null;
		}
		return schemaObject;
	}
}
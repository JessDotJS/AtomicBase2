import {SchemaUtilities} from './SchemaUtilities';
import {ValueHandler} from './ValueHandler';
import * as firebase from 'firebase';



export class Schema {
    private atomicPriority:any;
    private primary: any;
    private secondary: any;
    private foreign: any;

    /*
     * Schema initialization
     *
     * @param - Schema Object & atomicPriority
     * */

    constructor(schema: any, atomicPriority: any) {
        if(schema !== undefined && schema !== null) {
            this.atomicPriority = atomicPriority;


            //Build Schema Configuration Objects
            this.primary = schema.primary || false;
            this.secondary = schema.secondary || false;
            this.foreign = schema.foreign || false;
        }else{
            throw "There was an error initializing the AtomicSchema.";
        }
    }


    /*
     * Build
     *
     * @params
     * data - an Object
     * type - available options: snapshot, primary, secondary & foreign
     * @returns - proper formatted object with desired schema
     * */

    public build(data: any,type: string): any {
        const self = this;
        let properties: any;

        if(type === 'atomicObject'){
            properties  = data.val()
        }else{
            properties  = data
        }

        return self.buildSchemaProperties(self.getDefaults(data, type), properties, type);
    }

    /*
     * Build Schema Properties
     *
     * @params
     * defaults - default object properties
     * data - an object of the Entity
     * type - available options: atomicObject, primary, secondary & foreign
     * @returns - final schema object
     * */

    buildSchemaProperties(defaults: any, data: any, type: any): any {
        const self = this;
        let dataObject = defaults;
        let selfSchema: any;

        if(type == 'atomicObject'){
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
     * Get Defaults
     *
     * @params
     * data - an afObject coming from snapshot build
     * type - available options: snapshot, primary, secondary & foreign
     * @returns - proper formatted object with desired schema defaults
     * */

    getDefaults(data: any, type: any): any{
        const self = this;
        return self.defaultValue[type](data, self.atomicPriority.getPriority(data));
    }

    /*
     * Get Property Value
     *
     * @params
     * propertyObject - default object properties
     * propertiesData - an afObject coming from snapshot build
     * type - available options: atomicObject, primary, secondary & foreign
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
     * Default.type
     *
     * @params
     * data - an Entity's object
     * defaultPriority - predetermined priority of the item
     * type - available options: atomicObject, primary, secondary & foreign
     * @returns - default schema object
     * */

    defaultValue ={

        atomicObject: function(data: any, defaultPriority: any): any {
            if(data.exists()) {
                return {
                    $key: data.$key || data.key,
                    creationTS: data.val().creationTS,
                    lastEventTS: data.val().lastEventTS,
                    // latestServerTS: data.val().latestServerTS, Hopefully replaced by AngularFire
                    $priority: data.getPriority() || defaultPriority
                }
            }else {
                return {};
            }
        },
        primary: function(data: any, defaultPriority: any): any{
            if(data !== undefined && data !== null) {
                let currentClientTS = new Date().getTime();
                return {
                    creationTS: data.creationTS || currentClientTS,
                    lastEventTS: currentClientTS,
                    // latestServerTS: firebase.database.ServerValue.TIMESTAMP,
                    '.priority': data.$priority  || defaultPriority
                }
            }else{
                return {};
            }

        },
        secondary: function(data: any, defaultPriority: any): any {
            if(data != undefined && data != null) {
                let currentClientTS = new Date().getTime();
                return {
                    creationTS: data.creationTS || currentClientTS,
                    lastEventTS: currentClientTS,
                    // latestServerTS: firebase.database.ServerValue.TIMESTAMP,
                    '.priority': data.$priority  || defaultPriority
                }
            }else{
                return {};
            }

        },
        foreign: function(data: any, defaultPriority: any): any {
            if(data != undefined && data != null) {
                let currentClientTS = new Date().getTime();
                return {
                    key: data.$key || data.key,
                    creationTS: data.creationTS || currentClientTS,
                    lastEventTS: currentClientTS,
                    // latestServerTS: firebase.database.ServerValue.TIMESTAMP,
                    '.priority': data.$priority  || defaultPriority
                }
            }else{
                return {};
            }
        }
    }



}

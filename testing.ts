import firebase = require("firebase");
import { fetcherConfig } from './config';
import { Query } from './Classes/Query';
import {RefRegistrator} from './Classes/RefRegistrator';

firebase.initializeApp(fetcherConfig.firebaseConfig);



export const users: any[] = [
    {
        name: 'Jesus Graterol',
        type: 'student',
        age: '26'
    },
    {
        name: 'David Klie',
        type: 'teacher',
        age: '23'
    },
    {
        name: 'Jayme Armstrong',
        type: 'student',
        age: '24'
    },
    {
        name: 'Lesther Caballero',
        type: 'staff',
        age: '23'
    },
];







//let RegistratorClass =  new RefRegistrator();
//let QueryClass = new Query('');

//QueryClass.create();

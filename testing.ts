import firebase = require("firebase");
import { fetcherConfig } from './config';
import { Query } from './Classes/Query';
import {RefRegistrator} from './Classes/RefRegistrator';

firebase.initializeApp(fetcherConfig.firebaseConfig);


//let RegistratorClass =  new RefRegistrator();
//let QueryClass = new Query('');

//QueryClass.create();
"use strict";
exports.__esModule = true;
var firebase = require("firebase");
var config_1 = require("./config");
var Query_1 = require("./Classes/Query");
firebase.initializeApp(config_1.fetcherConfig.firebaseConfig);
var QueryClass = new Query_1.Query('kk', 'll');
QueryClass.create('d');

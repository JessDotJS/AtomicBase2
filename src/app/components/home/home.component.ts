import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Database } from '../../../assets/vendors/AtomicBase/Database';
import { User } from './User.Class'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


	user:any;


	storageRef:any;

  constructor() { 
  	this.user = new User();
  	//this.storageRef = firebase.storage().ref();
  	//this.user.db.schema.build();

  }

  ngOnInit() {
  }

}

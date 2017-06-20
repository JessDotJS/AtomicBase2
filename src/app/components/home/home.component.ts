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

	const users: any[] = [
	    {
	        name: 'Jesus Graterol',
	        type: 'student',
	        age: '26'
	    },
	    {
	        name: 'David Klie',
	        type: 'teacher',
	        age: '22'
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


  	let userObject = this.user.db.schema.build(users[0], 'primary');

  	this.user.db.query.create(userObject);

  	console.log(userObject.name);
  	//this.user.db.query.create();

  }

  ngOnInit() {
  }

}

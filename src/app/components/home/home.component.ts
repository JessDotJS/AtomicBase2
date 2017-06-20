import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Database } from '../../../assets/vendors/AtomicBase/Database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	storageRef:any;

  constructor() { 

  	//this.storageRef = firebase.storage().ref();

  }

  ngOnInit() {
  }

}

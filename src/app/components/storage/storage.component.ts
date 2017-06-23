import { Component, OnInit } from '@angular/core';
import {AtomicFile2} from '../../../assets/vendors/AtomicBase/AtomicFile2';
import { User } from '../../modules/User.Class';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

	user: any;

  constructor() { 
  	this.user = new User();
  }

  ngOnInit() {


  }
  uploadImage(){

  	let selectedFile = (<HTMLInputElement>document.getElementById('image')).files[0];
  	this.user.upload(selectedFile)
  		.then((snapshot)=>{
			console.log("Subida exitosa!");
		}).catch(function(err){ 
			console.log(err); 
		});
  }

}

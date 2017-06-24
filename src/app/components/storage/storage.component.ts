import { Component, OnInit } from '@angular/core';
import {AtomicFile} from '../../../assets/vendors/AtomicBase/AtomicFile';
import { User } from '../../modules/User.Class';
import * as firebase from 'firebase';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

	user: any;
  UploadProgress:number;

  constructor() { 
    this.user = new User();
  }

  ngOnInit() {


  }

  UpLoad(){
    this.uploadImage((<HTMLInputElement>document.getElementById('image')).files[0]);
  }

  uploadImage(selectedFile){
    const self = this;
    this.user.upload(selectedFile)
              .on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
                  self.UploadProgress  = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + self.UploadProgress + '% done');
              });

 // 		.then((snapshot)=>{
	//		console.log("Subida exitosa!");
//		}).catch(function(err){ 
	//		console.log(err); 
	//	});
  }

}

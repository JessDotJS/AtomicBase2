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
  noImageSelected:boolean;
  ImageUploaded:boolean;

  constructor() { 
    this.user = new User();
    this.noImageSelected = false;
    this.ImageUploaded = false;
  }

  ngOnInit() {


  }

  UpLoad(){
    const self = this;
    this.uploadImage((<HTMLInputElement>document.getElementById('image')).files[0]).then(function(val){
      console.log(val);
      if (val) {//Take action
        console.log("Image uploaded");
       }else{
          console.log("No image was selected");
       }
    }).catch(function(err){console.log(err.code)});
  }

  uploadImage(selectedFile):Promise<any>{
    const self = this;
    return new Promise(function(resolve, reject){
      if (selectedFile==undefined) {
          self.noImageSelected=true;
          resolve(false);
      } else {
          self.noImageSelected=false;
          let uploadTask = self.user.upload(selectedFile);
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
              self.UploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              console.log('Upload is ' + self.UploadProgress + '% done');
            },function (error) {
                reject(error);
            },function(){
                resolve(uploadTask.snapshot.downloadURL);
                self.ImageUploaded=true;
            })
      }
    }); 
  }

}

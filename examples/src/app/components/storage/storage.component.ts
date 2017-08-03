import { Component, OnInit } from '@angular/core';
import { Photo } from '../../modules/Photo.Class';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
    private storageRef: string;
    public photo: any;
    public photosArray: any;
    public files: any;
    public uploadProgress: number;
    public fileSelected: boolean;
    public selectedFile: any;
    public uploading: boolean;

    constructor(private _snackBar: MdSnackBar) {

        // Init
        this.photo = new Photo();
        this.fileSelected = false;
        this.uploadProgress = 0;
        this.uploading = false;
        this.storageRef = 'photos';


        // AtomicArray for Photos
        this.photosArray = this.photo.getArrayInstance();
        this.photosArray.on(this.photo.ref.root
            .child('photos/all'));
    }

    ngOnInit() {


    }

    upload(): void {
        this.uploading = true;
        const self = this;
        let uploadTask = self.photo.uploadFile(self.selectedFile, self.storageRef);
        uploadTask.on(self.photo.atomicFile.event.changed,
            function(snapshot) {
                self.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },function (err) {
                console.log(err);
            },function(){
                self._snackBar.open('Image Uploaded Successfully', 'Ok', {duration: 2000});
                self.setDefaults();
                self.photo.create({
                    name: uploadTask.snapshot.metadata.name,
                    url: uploadTask.snapshot.downloadURL
                });
            });
    }

    deletePhoto(item: any): void {
        const self = this;

        self.photo.deletePhoto(item)
            .then(function(){
                self._snackBar.open('Image Deleted Successfully', 'Ok', {duration: 2000});
            })
            .catch(function(err){
                console.log(err);
            })
    }


    fileChanged(e: any): void {
        let fileList = FileList = e.srcElement.files;
        if(fileList[0] !== undefined && fileList[0] !== null){
            this.files = fileList;
            this.fileSelected = true;
            this.selectedFile = fileList[0];
        }else{
            this.setDefaults();
        }
    }

    cancelUpload(): void {
        this.setDefaults();
    }

    setDefaults(): void {
        this.fileSelected = false;
        this.selectedFile = null;
        this.uploading = false;
        this.uploadProgress = 0;
    }

}

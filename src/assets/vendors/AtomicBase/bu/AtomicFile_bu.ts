import * as firebase from 'firebase';

export class AtomicFile {
    ref: any;
    progress: number;

    constructor(ref) {
        this.ref = ref;
        this.progress = 0;
    }

    public upload(file: any, customRef: any): Promise<any> {
        const self = this;
        self.progress = 0;
        return new Promise(function(resolve, reject){
            const fileName = AtomicFile.generateName(file);
            const uploadTask =
                self.ref.rootStorage
                    .child(customRef || self.ref.primaryStorage)
                    .child(fileName)
                    .put(file);

            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                /*
                 * nextOrObserver / Optional / (nullable function(non-null Object) or non-null Object)
                 * The next function, which gets called for each item in the event
                 * stream, or an observer object with some or all of these three
                 * properties (next, error, complete).
                 * */
                function(snapshot: any){
                    self.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                },
                /*
                 * error / Optional / function(non-null Error)
                 * A function that gets called with an Error if the event stream ends due to an error.
                 * Value may be null.
                 * */
                function(err){ reject(err); },
                /*
                 * complete / Optional / function()
                 * A function that gets called if the event stream ends normally.
                 * Value may be null.
                 * */
                function(){
                    const fileURL = uploadTask.snapshot.downloadURL;
                    resolve({
                        fileName: fileName,
                        fileUrl: fileURL
                    });
                });

        });
    }

    public delete(fileName: string, customRef: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject){
            self.ref.rootStorage
                .child(customRef || self.ref.primaryStorage + '/' + fileName)
                .delete()
                .then(function(){
                    resolve(true);
                })
                .catch(function(err){ reject(err); });
        });
    }

    private static generateName(file: any): string {
        return AtomicFile.generateRandomNumbers() +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() +
            AtomicFile.generateRandomNumbers() +
            AtomicFile.generateRandomNumbers() + '.' +
            AtomicFile.getFileExtension(file);
    }

    private static generateRandomNumbers(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    private static getFileExtension(file: any): string{
        switch (file.type) {
            case 'image/jpeg':
                return 'jpeg';
            case 'image/gif':
                return 'gif';
            case 'image/png':
                return 'png';
            case 'image/svg+xml':
                return 'svg';
            default:
                break;
        }

    }


}

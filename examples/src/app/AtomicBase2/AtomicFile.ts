import * as firebase from 'firebase';


export class AtomicFile {
    public rootStorage: any;
    public event: any;
    public state: any;

	constructor() {
        this.rootStorage = firebase.storage().ref();

        this.event = {
            changed: firebase.storage.TaskEvent.STATE_CHANGED
        };

        this.state = {
            paused: firebase.storage.TaskState.PAUSED,
            running: firebase.storage.TaskState.RUNNING
        }
	}

	protected upload(file: any, ref: string, config?: any): Promise<any> {
		const self = this;
		const uploadRef = self.rootStorage.child(ref + '/' + AtomicFile.generateName(file));
		return uploadRef.put(file);
	}

	protected deleteFile(ref: string): Promise<any>{
	    return this.rootStorage.child(ref).delete();
    }




    private static generateName(file: any): string {
        return AtomicFile.generateRandomNumbers() +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
            AtomicFile.generateRandomNumbers() + '-' +
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
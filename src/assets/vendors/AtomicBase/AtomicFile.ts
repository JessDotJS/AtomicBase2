import * as firebase from 'firebase';


export class AtomicFile {
    ref: any;
    progress: number;

	constructor(ref){
		this.ref = ref;

	}

	public upload(file:any){
		const self = this;
		let storageRef = self.ref.rootStorage;
		console.log('name: '+file.name );
  		console.log('size: '+file.size);
  		console.log('type: '+file.type);
		let path = `/${file.name}`;
		let iRef = storageRef.child(path);
		return iRef.put(file);
	}

}
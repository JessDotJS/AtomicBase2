import * as firebase from 'firebase';

export class AtomicMessaging {
    public instance: any;

    constructor() {
        this.instance = firebase.messaging();
    }



}
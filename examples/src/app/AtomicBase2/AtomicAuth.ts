import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { observeOn } from 'rxjs/operator/observeOn';

export class AtomicAuth {
    public instance: any;

	constructor() {
	    this.instance = firebase.auth();
	}

    private init(): Observable<any> {
        return Observable.create((observer: Observer<firebase.User>) => {
            this.instance.onAuthStateChanged(
                (user?: firebase.User) => observer.next(user!),
                (error: firebase.auth.Error) => observer.error(error),
                () => observer.complete()
            );
        });
    }

}
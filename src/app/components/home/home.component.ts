import { Component, OnInit } from '@angular/core';
import { User } from '../../modules/User.Class';





@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
    user: any;

    constructor() {
        this.user = new User();
    }

    ngOnInit() {
        this.initTesting();
    }



    initTesting() {
        const self = this;

        // Create user
        self.user.create({
            name: 'Jesus Graterol',
            type: 'teachers',
            age: 26})
            .then(function(userKey){
                console.log('User Created: ' + userKey);

                // Retrieve Created User
                console.log('Retrieving Created User');
                self.user.ref.root
                    .child(self.user.ref.primary + '/' + userKey)
                    .once('value')
                    .then(function(snapshot){
                        console.log(snapshot.val());

                        // Building AtomicObject - This is irrelevant if working with AngularFire
                        console.log('Creating an AtomicObject of the User');
                        const atomicObject = self.user.schema.build(snapshot, 'snapshot');
                        console.log(atomicObject);

                        // Building Schemas
                        console.log('Building Schemas (Primary, Secondary, Foreign)');
                        console.log(self.user.schema.build(atomicObject, 'primary'));
                        console.log(self.user.schema.build(atomicObject, 'secondary'));
                        console.log(self.user.schema.build(atomicObject, 'foreign'));



                        // Creating a Foreign Ref
                        self.user.ref.root
                            .child('favoritePeople/' + userKey)
                            .set(self.user.schema.build(atomicObject, 'foreign'))
                            .then(function(response){
                                console.log('Foreign Element Created');


                                // Updating the record
                                atomicObject.name = 'John Wiesser';
                                atomicObject.age = 50;
                                console.log('Updating record in 5 seconds...');
                                setTimeout(function(){
                                    self.user.update(atomicObject)
                                        .then(function(response){
                                            console.log('Record Updated');

                                            // Removing the record
                                            console.log('Removing record in 5 seconds...');
                                            setTimeout(function(){
                                                self.user.remove(atomicObject)
                                                    .then(function(response){
                                                        console.log('Record Removed');

                                                    })
                                                    .catch(function(err){ console.log(err); });
                                            }, 5000);
                                        })
                                        .catch(function(err){ console.log(err); });
                                }, 5000);
                            })
                            .catch(function(err){ console.log(err); });
                    }).catch(function(err){ console.log(err); });
            }).catch(function(err) { console.log(err)});
    }

}

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
        this.user.db.query.create(this.user.db.schema.build({
            name: 'Jesus Graterol',
            type: 'student',
            age: 24
        }, 'primary'));
    }

    ngOnInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { User } from '../../modules/User.Class';


@Component({
    selector: 'app-schema',
    templateUrl: './schema.component.html',
    styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
    user: any;

    constructor() {
        this.user = new User();
    }

    ngOnInit() {
        const self = this;

        let primarySchema = self.user.schema.build({
            name: 'Jess Graterol',
            type: 'teachers',
            age: 26}, 'primary');

        console.log(primarySchema);
    }

}

import { Component, OnInit } from '@angular/core';
import { Card } from '../../modules/Card.Class';

@Component({
    selector: 'app-atomic-array',
    templateUrl: './atomic-array.component.html',
    styleUrls: ['./atomic-array.component.css']
})
export class AtomicArrayComponent implements OnInit {
    public card: any;
    public atomicArray: any;

    constructor() {
        this.card = new Card();

        //Initialize the AtomicArray
        this.atomicArray = this.card.getArrayInstance();

        const query = this.card.ref.root
            .child('cards/all');

        const config = {
            type: 'infinite', // infinite or query
            firstLotSize: 10,
            nextLotSize: 5
        };

        this.atomicArray.on(query, config);
    }

    ngOnInit() {
        // this.initRecords();
    }

    initRecords(): void {
        const self = this;
        let counter = 0;
        setInterval(function(){
            counter++;
            self.card.create({
                title: 'Card #' + counter
            })
        }, 3000);
    }
}

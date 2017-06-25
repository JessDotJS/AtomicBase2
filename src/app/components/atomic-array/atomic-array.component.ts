import { Component, OnInit } from '@angular/core';
import { Card } from '../../modules/Card.Class';
import { Article } from '../../modules/Article.Class';

@Component({
    selector: 'app-atomic-array',
    templateUrl: './atomic-array.component.html',
    styleUrls: ['./atomic-array.component.css']
})
export class AtomicArrayComponent implements OnInit {
    public card: any;
    public article: any;
    public atomicArray: any;
    public articlesArray: any;

    constructor() {
        // Standard AtomicArray
        this.card = new Card();
        this.atomicArray = this.card.getArrayInstance();
        const standardQuery = this.card.ref.root
            .child('cards/all');
        const standardConfig = {
            firstLotSize: 10,
            nextLotSize: 5
        };
        this.atomicArray.on(standardQuery, standardConfig);




        // AtomicArray w/ Querybase
        this.article = new Article();
        this.articlesArray = this.article.getArrayInstance();

        const advancedQuery = this.article.ref.root
            .child('articles/all');

        const advancedConfig = {
            firstLotSize: 10,
            nextLotSize: 5,
            where: {
                titleSearchable: {
                    startsWith: 'ca'
                }
            }
        };

        this.articlesArray.on(advancedQuery, advancedConfig);

    }

    ngOnInit() {
        // this.initCardRecords();
        //this.initArticleRecords();
    }

    initArticleRecords(): void {
        this.article.create({
            title: 'The United States of America',
            description: 'Is one of the most powerful countries in the world.',
            rank: 10});
        this.article.create(
            {title: 'Bolivarian Republic of Venezuela',
                description: 'One of the most dangerous countries in the world',
                rank: 3});
        this.article.create({
            title: 'Canada And some Other text',
            description: 'Canada produces a lot of alcohol and sells it to Al Capone',
            rank: 7});
        this.article.create({title: 'Australia',
            description: 'South Australian companies sell goods to make profit.',
            rank: 8});
        this.article.create({
            title: 'Colombia',
            description: 'Is not too different to Venezuela lol',
            rank: 5});
        this.article.create({
            title: 'Europe and crazy development',
            description: 'A lot of investments coming from Europe.',
            rank: 10});
    }

    initCardRecords(): void {
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

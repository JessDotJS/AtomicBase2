import { Component, OnInit } from '@angular/core';
import { Article } from '../../modules/Article.Class';


@Component({
    selector: 'app-atomic-object',
    templateUrl: './atomic-object.component.html',
    styleUrls: ['./atomic-object.component.css']
})
export class AtomicObjectComponent implements OnInit {
    public article: any;
    public atomicObject: any;


    constructor() {
        this.article = new Article();
        this.atomicObject = this.article.getObjectInstance();
        this.atomicObject.on(this.article.ref.root.child('articles/all/-KnQYJHLAwTSz2xm_mTo'));
    }

    ngOnInit() {
    }

}

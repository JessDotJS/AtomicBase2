/**
 * Created by jessdotjs on 22/06/17.
 */
import {AtomicEntity} from '../AtomicBase2/AtomicEntity';




export class Article extends AtomicEntity {

    constructor() {
        super({

            refs: {
                primary: 'articles/all'
            },

            schema: {
                primary: {
                    title: {
                        value: '='
                    },
                    titleSearchable: {
                        value: function(article){
                            return article.title.toLowerCase();
                        }
                    },
                    description: {
                        value: '='
                    },
                    descriptionTags: {
                        value: function(article){
                            return article.description.toLowerCase();
                        }
                    },
                    rank: {
                        value: '='
                    }
                }
            }

        });


    }

}


/**
 * Created by jessdotjs on 22/06/17.
 */
import {AtomicEntity} from '../../assets/vendors/AtomicBase/AtomicEntity';




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
                    descriptionSearchable: {
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

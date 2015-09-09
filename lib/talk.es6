import markdown from './markdown';
import title    from './title';

export default class Talk {

    constructor(root) {
        this.title  = title(root);
        this.slides = [];
        this.body   = markdown.stringify(root).trim();
    }

}

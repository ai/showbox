import markdown from './markdown';
import commands from './commands';
import title    from './title';

export default class Talk {

    constructor(root) {
        let [body, data] = commands(root);
        this.title  = title(body);
        this.body   = markdown.stringify(body).trim();
        this.theme  = data.theme;
        this.slides = [];
    }

}

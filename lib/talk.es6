import extractCSS from './extract-css';
import markdown   from './markdown';
import commands   from './commands';
import title      from './title';

export default class Talk {

    constructor(root, base = '.') {
        let data;
        [root, data]     = commands(root, base);
        [root, this.css] = extractCSS(root);
        this.title  = title(root);
        this.body   = markdown.stringify(root).trim();
        this.theme  = data.theme;
        this.slides = [];
    }

}

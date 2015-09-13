import extractCSS from './extract-css';
import highlight  from './highlight';
import markdown   from './markdown';
import commands   from './commands';

export default class Slide {

    constructor(root, base) {
        let data;
        [root, data]     = commands(root, base);
        [root, this.css] = extractCSS(root);
        root = highlight(root);
        this.types = data.types || [];
        this.body  = markdown.stringify(root).trim();
    }

}

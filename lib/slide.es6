import extractCSS from './extract-css';
import markdown   from './markdown';
import commands   from './commands';

export default class Slide {

    constructor(root, base) {
        let data;
        [root, data]     = commands(root, base);
        [root, this.css] = extractCSS(root);
        this.types = data.types || [];
        this.body  = markdown.stringify(root).trim();
    }

}

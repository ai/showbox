import markdown from './markdown';
import commands from './commands';

export default class Slide {

    constructor(root) {
        let [body, data] = commands(root);
        this.types = data.types || [];
        this.body  = markdown.stringify(body).trim();
    }

}

import markdown from './markdown';

export default class Slide {

    constructor(root) {
        this.body = markdown.stringify(root).trim();
    }

}

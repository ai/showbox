import markdown from './markdown';
import split    from './split';
import Slide    from './slide';
import Talk     from './talk';

export default function parse(input, base) {
    let root  = markdown.parse(input);
    let parts = split(root);

    let talk;
    for ( let part of parts ) {
        if ( !talk ) {
            talk = new Talk(part, base);
        } else {
            let slide = new Slide(part, base);
            talk.slides.push(slide);
        }
    }

    return talk;
}

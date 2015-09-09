import markdown from './markdown';
import split    from './split';
import Slide    from './slide';
import Talk     from './talk';

export default function parse(input) {
    let root  = markdown.parse(input);
    let parts = split(root);

    let talk;
    for ( let part of parts ) {
        if ( !talk ) {
            talk = new Talk(part);
        } else {
            let slide = new Slide(part);
            talk.slides.push(slide);
        }
    }

    return talk;
}

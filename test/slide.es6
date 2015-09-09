import { expect } from 'chai';
import   mdast    from 'mdast';

import Slide from '../lib/slide';

function build(md) {
    let root = mdast().parse(md);
    return new Slide(root);
}

describe('Slide', () => {

    describe('body', () => {

        it('saves title', () => {
            let slide = build('## Title\n\nHi');
            expect(slide.body).to.eql('<h2>Title</h2>\n<p>Hi</p>');
        });

    });

});

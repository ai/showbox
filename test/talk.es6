import { expect } from 'chai';
import   mdast    from 'mdast';

import Talk from '../lib/talk';

function build(md) {
    let root = mdast().parse(md);
    return new Talk(root);
}

describe('Talk', () => {

    describe('title', () => {

        it('saves title', () => {
            let talk = build('# Title\n\nHi');
            expect(talk.title).to.eql('Title');
        });

    });

    describe('body', () => {

        it('saves title', () => {
            let talk = build('# Title\n\nHi');
            expect(talk.body).to.eql('<h1>Title</h1>\n<p>Hi</p>');
        });

    });

});

import   mdast    from 'mdast';
import { expect } from 'chai';

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

    describe('theme', () => {

        it('saves theme', () => {
            let talk = build('# Title\n!theme cool');
            expect(talk.theme).to.eql('cool');
        });

    });

    describe('body', () => {

        it('saves title', () => {
            let talk = build('# Title\n\nHi');
            expect(talk.body).to.eql('<h1>Title</h1>\n<p>Hi</p>');
        });

    });

    describe('css', () => {

        it('extracts styles', () => {
            let slide = build('# Title\n\n<style>a {\n}</style>');
            expect(slide.css).to.eql('a {\n}');
            expect(slide.body).to.eql('<h1>Title</h1>');
        });

    });

});

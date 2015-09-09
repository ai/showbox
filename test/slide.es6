import { expect } from 'chai';
import   mdast    from 'mdast';

import Slide from '../lib/slide';

function build(md) {
    let root = mdast().parse(md);
    return new Slide(root);
}

describe('Slide', () => {

    describe('types', () => {

        it('is empty by default', () => {
            let slide = build('## Title\n\nHi');
            expect(slide.types).to.eql([]);
        });

        it('fills by commands', () => {
            let slide = build('## Title\n!type a\n!type b c\n\nHi');
            expect(slide.types).to.eql(['a', 'b c']);
        });

    });

    describe('body', () => {

        it('saves title', () => {
            let slide = build('## Title\n\nHi');
            expect(slide.body).to.eql('<h2>Title</h2>\n<p>Hi</p>');
        });

    });

    describe('css', () => {

        it('extracts styles', () => {
            let slide = build('## Title\n\n<style>a {\n}</style>');
            expect(slide.css).to.eql('a {\n}');
            expect(slide.body).to.eql('<h2>Title</h2>');
        });

    });

});

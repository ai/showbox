import   mdast    from 'mdast';
import { expect } from 'chai';

import Talk from '../lib/talk';

function build(md) {
    let root = mdast().parse(md);
    return new Talk(root, __dirname);
}

describe('Talk', () => {

    describe('favicon', () => {

        it('is false by defails', () => {
            let talk = build('# Title');
            expect(talk.favicon).to.be.false;
        });

        it('saves favicon', () => {
            let talk = build('# Title\n!favicon data/dot.png');
            expect(talk.favicon).to.eql('data:image/png;base64,' +
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAA' +
                'CklEQVQIHWP4DwABAQEANl9ngAAAAABJRU5ErkJggg==');
        });

    });

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

    describe('lang', () => {

        it('saves lang', () => {
            let talk = build('# Title\n!lang ru');
            expect(talk.lang).to.eql('ru');
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

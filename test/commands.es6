import   mdast    from 'mdast';
import { expect } from 'chai';

import ShowboxError from '../lib/showbox-error';
import commands     from '../lib/commands';

function build(md, base) {
    return commands(mdast().parse(md), base);
}

describe('commands()', () => {

    it('removes commands', () => {
        let root = build('A\n\n!type 1\n!type 2\n\nD\n\n!type 3\n\nE\n')[0];
        expect(mdast().stringify(root)).to.eql('A\n\nD\n\nE\n');
    });

    it('processes type as array', () => {
        let data = build('!type 1\n\n!type 2')[1];
        expect(data).to.eql({ types: ['1', '2'] });
    });

    it('works with several commands in paragraph', () => {
        let data = build('!type 1\n!type 2')[1];
        expect(data).to.eql({ types: ['1', '2'] });
    });

    it('saves theme', () => {
        let data = build('!theme 1\n\n!theme 2')[1];
        expect(data).to.eql({ theme: '2' });
    });

    it('saves lang', () => {
        let data = build('!lang 1\n\n!lang 2')[1];
        expect(data).to.eql({ lang: '2' });
    });

    it('trims spaces', () => {
        let data = build('!theme  1  2')[1];
        expect(data).to.eql({ theme: '1  2' });
    });

    it('inlines image', () => {
        let root = build('!image data/dot.png', __dirname)[0];
        expect(mdast().stringify(root)).to.eql('<img src="data:image/png;' +
            'base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQ' +
            'VQIHWP4DwABAQEANl9ngAAAAABJRU5ErkJggg==">\n');
    });

    it('inlines image with link', () => {
        let root = build('!image data/dot.png http://ya.ru', __dirname)[0];
        expect(mdast().stringify(root)).to.eql('<a href="http://ya.ru">' +
            '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB' +
            'CAAAAAA6fptVAAAACklEQVQIHWP4DwABAQEANl9ngAAAAABJRU5ErkJggg==">' +
            '</a>\n');
    });

    it('inlines covers', () => {
        let [root, data] = build('!cover data/dot.png', __dirname);
        expect(data).to.eql({ types: ['cover', 'h'] });
        expect(mdast().stringify(root)).to.eql('<img src="data:image/png;' +
            'base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQ' +
            'VQIHWP4DwABAQEANl9ngAAAAABJRU5ErkJggg==">\n');
    });

    it('inlines covers', () => {
        let data = build('!favicon data/dot.png', __dirname)[1];
        expect(data.favicon).to.eql('data:image/png;base64,' +
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAA' +
            'CklEQVQIHWP4DwABAQEANl9ngAAAAABJRU5ErkJggg==');
    });

    it('raise on unknown command', () => {
        expect( () => {
            build('!not 1');
        }).to.throw(ShowboxError, 'Unknown command !not');
    });

});

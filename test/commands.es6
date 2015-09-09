import   mdast    from 'mdast';
import { expect } from 'chai';

import ShowboxError from '../lib/showbox-error';
import commands     from '../lib/commands';

function build(md) {
    return commands(mdast().parse(md));
}

describe('commands', () => {

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

    it('raise on unknown command', () => {
        expect( () => {
            build('!not 1');
        }).to.throw(ShowboxError, 'Unknown command !not');
    });

});

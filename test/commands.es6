import   mdast    from 'mdast';
import { expect } from 'chai';

import commands from '../lib/commands';

function build(md) {
    return commands(mdast().parse(md));
}

describe('commands', () => {

    it('removes commdands', () => {
        let [root] = build('A\n\n!a\n!b\nC\n\nD\n\n!c\n\nE\n');
        expect(mdast().stringify(root)).to.eql('A\n\nD\n\nE\n');
    });

    it('saves unknown command', () => {
        let [root, data] = build('!a 1\n\n!b 2');
        expect(data).to.eql({ a: '1', b: '2' });
    });

    it('works with several commands in paragraph', () => {
        let [root, data] = build('!a 1\n!b 2');
        expect(data).to.eql({ a: '1', b: '2' });
    });

    it('works with different parameters', () => {
        let [root, data] = build('!a 1 2\n!b');
        expect(data).to.eql({ a: '1 2', b: undefined });
    });

    it('processes type as array', () => {
        let [root, data] = build('!type 1\n!type 2');
        expect(data).to.eql({ types: ['1', '2'] });
    });

});

import   mdast    from 'mdast';
import { expect } from 'chai';

import title from '../lib/title';

function test(md, result) {
    let root = mdast().parse(md);
    expect(title(root)).to.eql(result);
}

describe('title()', () => {

    it('returns empty string by default', () => {
        test('Hi', '');
    });

    it('returns title text', () => {
        test('# Hi', 'Hi');
    });

    it('processes main title only', () => {
        test('## Hi', '');
    });

    it('finds titles', () => {
        test('A\n\n# Hi', 'Hi');
    });

    it('removes tags', () => {
        test('# A [*B* C](#link)', 'A B C');
    });

});

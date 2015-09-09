import   mdast    from 'mdast';
import { expect } from 'chai';

import extractCSS from '../lib/extract-css';

function build(md) {
    return extractCSS(mdast().parse(md));
}

describe('extractCSS()', () => {

    it('removes style tags', () => {
        let root = build('<style></style>\n\nTest')[0];
        expect(mdast().stringify(root)).to.eql('Test\n');
    });

    it('saves styles', () => {
        let style = build('<style>color: black</style>\n\nTest')[1];
        expect(style).to.eql('color: black');
    });

    it('concats styles', () => {
        let style = build('<style>a{}</style>\n\n<style>b{}</style>\n\nA')[1];
        expect(style).to.eql('a{}b{}');
    });

});

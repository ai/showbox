import   mdast    from 'mdast';
import { expect } from 'chai';

import highlight from '../lib/highlight';

function build(md) {
    return highlight(mdast().parse(md));
}

describe('highlight()', () => {

    it('highlights code by language', () => {
        let root = build('```javascript\nvar one = 1;\n```');
        expect(root.children[0].type).to.eql('html');
        expect(root.children[0].value).to.include('<pre><code>');
        expect(root.children[0].value).to.include('hljs-keyword');
    });

    it('uses aliases', () => {
        let root = build('```js\nvar one = 1;\n```');
        expect(root.children[0].type).to.eql('html');
    });

    it('ignores code nodes without language', () => {
        let root = build('```\nvar one = 1;\n```');
        expect(root.children[0].type).to.eql('code');
    });

    it('marks important parts', () => {
        let root = build('```js\nvar ***one*** = 1;\n```');
        expect(root.children[0].value).to.include(
            '<mark class="important">one</mark>');
    });

    it('marks important at start', () => {
        let root = build('```js\n***var*** one = 1;\n```');
        expect(root.children[0].value).to.include(
            '<mark class="important">var</mark>');
    });

    it('marks important in HTML', () => {
        let root = build('```js\n1 < 2 && true;\nvar ***one*** = 1;\n```');
        expect(root.children[0].value).to.include(
            '<mark class="important">one</mark>');
    });

    it('marks important HTML', () => {
        let root = build('```js\na ***&&*** b\n```');
        expect(root.children[0].value).to.include(
            '<mark class="important">&amp;&amp;</mark>');
    });

});

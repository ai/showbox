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

});

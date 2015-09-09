import   html     from 'mdast-html';
import   mdast    from 'mdast';
import { expect } from 'chai';

import split from '../lib/split';

describe('split()', () => {

    let root, parts;
    before( () => {
        let md = '# Title\nbody\n## S1\n## S2\n### Sub';
        root   = mdast().parse(md);
        parts  = split(root);
    });

    it('splits slides by h2', () => {
        expect(parts.length).to.eql(3);
    });

    it('saves position', () => {
        for ( let part of parts ) {
            expect(part.type).to.eql(root.type);
            expect(part.position).to.eql(root.position);
        }
    });

    it('does not broke stringifing', () => {
        let str = mdast().use(html);
        expect(str.stringify(parts[0])).to.eql('<h1>Title</h1>\n<p>body</p>\n');
        expect(str.stringify(parts[1])).to.eql('<h2>S1</h2>\n');
        expect(str.stringify(parts[2])).to.eql('<h2>S2</h2>\n<h3>Sub</h3>\n');
    });

});

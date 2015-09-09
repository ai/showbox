import { expect } from 'chai';

import parse from '../lib/parse';

describe('parse()', () => {

    it('parses input markdown to classes', () => {
        let talk = parse('# Talk\n\n## S1\n\n## S2');
        expect(talk.slides.length).to.eql(2);
    });

});

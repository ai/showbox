import { expect } from 'chai';
import   path     from 'path';

import ShowboxError from '../lib/showbox-error';
import inlineImage  from '../lib/inline-image';

describe('inlineImage()', () => {

    it('generates <img> for PNG', () => {
        let html = inlineImage(path.join(__dirname, 'data/dot.png'));
        expect(html).to.eql('data:image/png;base64,iVBORw0KGgoAAAAN' +
            'SUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQIHWP4DwABAQEANl' +
            '9ngAAAAABJRU5ErkJggg==');
    });

    it('raises on unknown file', () => {
        expect( () => {
            inlineImage(path.join('not.png'));
        }).to.throw(ShowboxError, 'Can\'t read image not.png');
    });

});

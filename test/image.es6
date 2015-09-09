import { expect } from 'chai';
import   path     from 'path';

import ShowboxError from '../lib/showbox-error';
import image        from '../lib/image';

describe('image()', () => {

    it('generates <img> for PNG', () => {
        let html = image(path.join(__dirname, 'data/dot.png'));
        expect(html).to.eql('<img src="data:image/png;base64,iVBORw0KGgoAAAAN' +
            'SUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQIHWP4DwABAQEANl9ngAAAAABJ' +
            'RU5ErkJggg==">');
    });

    it('raises on unknown file', () => {
        expect( () => {
            image(path.join('not.png'));
        }).to.throw(ShowboxError, 'Can\'t read image not.png');
    });

});

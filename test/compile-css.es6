import { expect } from 'chai';

import compileCSS from '../lib/compile-css';

describe('compileCSS()', () => {

    it('compresses CSS', (done) => {
        compileCSS({
            html: '<b>',
            css:  'a { -o-border-radius: 5px; border-radius: 5px }'
        }).then( (data) => {
            expect(data).to.eql({ html: '<b>', css: 'a{border-radius:5px}' });
            done();
        }).catch(done);
    });

});

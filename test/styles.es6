import { expect } from 'chai';

import styles from '../lib/styles';

describe('styles()', () => {

    it('compresses CSS', (done) => {
        styles({
            html: '<b>',
            css:  'a { -o-border-radius: 5px; border-radius: 5px }'
        }).then( (data) => {
            expect(data).to.eql({ html: '<b>', css: 'a{border-radius:5px}' });
            done();
        }).catch(done);
    });

});

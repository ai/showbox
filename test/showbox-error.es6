import { expect } from 'chai';

import ShowboxError from '../lib/showbox-error';

describe('ShowboxError', () => {

    it('has error properties', () => {
        let error;
        try {
            throw new ShowboxError('test');
        } catch (e) {
            error = e;
        }

        expect(error.name).to.eql('ShowboxError');
        expect(error.message).to.eql('test');
        expect(error.stack).to.include('showbox-error');
    });

});

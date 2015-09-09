import { expect } from 'chai';

import compileCSS from '../lib/compile-css';

let empty = { css: '', slides: [] };

describe('compileCSS()', () => {

    it('compresses CSS', (done) => {
        compileCSS(empty, {
            html: '<b>',
            css:  'a { -o-border-radius: 5px; border-radius: 5px }'
        }).then( (data) => {
            expect(data).to.eql({ html: '<b>', css: 'a{border-radius:5px}' });
            done();
        }).catch(done);
    });

    it('includes talk css', (done) => {
        compileCSS({ css: 'a: 1;', slides: [] }, {
            css: 'b: 2;'
        }).then( (data) => {
            expect(data.css).to.eql('b:2;a:1;');
            done();
        }).catch(done);
    });

    it('includes slides css', (done) => {
        let talk = {
            css:    'a: 1;',
            slides: [{ css: 'a: 2' }, { css: 'a: 3' }]
        };
        compileCSS(talk, {
            slide: i => '.s' + i,
            css:   'b: 2;'
        }).then( (data) => {
            expect(data.css).to.eql('b:2;a:1;.s0{a:2}.s1{a:3}');
            done();
        }).catch(done);
    });

});

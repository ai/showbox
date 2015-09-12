import resolve from 'resolve';
import path    from 'path';

import compileCSS from './compile-css';
import layout     from './layout';
import parse      from './parse';

export default function bundler(input, opts = { }) {
    let basedir = '.';
    if ( opts.file ) basedir = path.dirname(opts.file);

    let talk;
    try {
        talk = parse(input, basedir);
    } catch (e) {
        return Promise.reject(e);
    }

    return new Promise( (done, reject) => {
        resolve(talk.theme, { basedir }, (err, file) => {
            if ( err ) return reject(err);
            let theme = require(file);
            done(theme(talk));
        });
    })
    .then( data => compileCSS(talk, data) )
    .then( data => layout(talk, data) );

}

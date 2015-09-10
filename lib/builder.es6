import resolve from 'resolve';
import path    from 'path';

import compileCSS from './compile-css';
import layout     from './layout';
import parse      from './parse';

export default function bundler(input, opts = { }) {
    let base = '.';
    if ( opts.file ) base = path.dirname(opts.file);

    let talk;
    try {
        talk = parse(input, base);
    } catch (e) {
        return Promise.reject(e);
    }

    let theme = require(resolve.sync(talk.theme, { basedir: base }));
    return theme(talk)
        .then( data => compileCSS(talk, data) )
        .then( data => layout(talk, data) );
}

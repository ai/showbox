import resolve from 'resolve';
import path    from 'path';

import compileCSS from './compile-css';
import layout     from './layout';
import parse      from './parse';

export default function bundler(input, opts = { }) {
    let talk = parse(input);

    let base = '.';
    if ( opts.file ) base = path.dirname(opts.file);

    let theme = require(resolve.sync(talk.theme, { basedir: base }));
    return theme(talk)
        .then( data => compileCSS(data) )
        .then( data => layout(talk, data) );
}

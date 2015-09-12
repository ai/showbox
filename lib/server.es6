import browserSync from 'browser-sync';
import path        from 'path';

import buildFile from './build-file';

export default function server(file, error) {
    let bs = browserSync.create();

    bs.watch(file).on('change', () => {
        setTimeout( () => {
            buildFile(file).then(bs.reload).catch(error.bind(this, false));
        }, 1);
    });

    buildFile(file).then( (output) => {
        bs.init({
            logPrefix: 'showbox',
            ghostMode: false,
            startPath: '/' + path.basename(output),
            server:    path.dirname(output),
            notify:    false
        });
    }).catch(error.bind(this, true));
}

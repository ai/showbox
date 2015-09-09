import fs from 'fs';

import ShowboxError from './showbox-error';
import builder      from './builder';

export default function buildName(file) {
    return file.replace(/.\w+$/i, '') + '.html';
}

export default function buildFile(file) {
    return new Promise( (resolve, reject) => {
        let error = function (text) {
            reject(new ShowboxError(text));
        };

        fs.readFile(file, (err, input) => {
            if ( err ) return error('Can\'t read keynotes file ' + file);

            builder(input.toString(), { file }).then( (output) => {
                let name = buildName(file);
                fs.writeFile(name, output, (err2) => {
                    if ( err2 ) return error('Can\'t save result to ' + name);
                    resolve(name);
                });
            }).catch( err2 => reject(err2) );
        });
    });
}

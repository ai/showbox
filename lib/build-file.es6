import fs from 'fs';

import builder from './builder';

export default function buildName(file) {
    return file.replace(/.\w+$/i, '') + '.html';
}

export default function buildFile(file) {
    return new Promise( (resolve, reject) => {
        fs.readFile(file, (err, input) => {
            if ( err ) return reject('Can\'t read keynotes file ' + file);

            builder(input.toString(), { file }).then( (output) => {
                let name = buildName(file);
                fs.writeFile(name, output, (err2) => {
                    if ( err2 ) return reject('Can\'t save result to ' + name);
                    resolve(name);
                });
            }).catch( err2 => reject(err2) );
        });
    });
}

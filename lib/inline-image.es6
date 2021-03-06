import mime from 'mime-types';
import fs   from 'fs';

import ShowboxError from './showbox-error';

export default function inlineImage(path) {
    let file;
    try {
        file = fs.readFileSync(path);
    } catch (e) {
        throw new ShowboxError('Can\'t read image ' + path);
    }
    let type = mime.lookup(path) || 'application/octet-stream';
    return 'data:' + type + ';base64,' + file.toString('base64');
}

export default function layout(talk, data) {
    let favicon = '';
    if ( talk.favicon ) {
        favicon = '<link rel="icon" href="' + talk.favicon + '">';
    }

    return '<!DOCTYPE html>' +
           '<html lang="' + (talk.lang || 'en') + '">' +
               '<meta charset="UTF-8">' +
               favicon +
               '<title>' + talk.title + '</title>' +
               data.head +
               '<style>' + data.css + '</style>' +
               '<body' + data.body + '>' +
                   data.html +
               '</body>' +
               '<script>' + data.js + '</script>' +
           '</html>';
}

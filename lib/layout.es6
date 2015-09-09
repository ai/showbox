export default function layout(talk, data) {
    return '<!DOCTYPE html>' +
           '<html>' +
               '<meta charset="UTF-8">' +
               '<title>' + talk.title + '</title>' +
               data.head +
               '<style>' + data.css + '</style>' +
               '<body' + data.body + '>' +
                   data.html +
               '</body>' +
               '<script>' + data.js + '</script>' +
           '</html>';
}

import yargs from 'yargs';
import fs    from 'fs';

import builder from './builder';
import npm     from '../package';

let argv = yargs
    .usage('Usage: $0 COMMAND FILE')
    .example('$0 build talk.md')
    .command('build', 'Compile keynotes to HTML and put it in same dir')
    .help('h')
    .alias('h', 'help')
    .version( () => npm.name + ' ' + npm.version )
    .alias('v', 'version')
    .argv;

let command = argv._[0];
let file    = argv._[1];

function error(message, code = 1) {
    console.error('showbox: ' + message);
    process.exit(code);
}

if ( command === 'build' ) {
    if ( !file ) error('Keynotes file is missed');
    fs.readFile(file, (err, input) => {
        if ( err ) error('Can\'t read keynotes file ' + file, 127);

        let output = builder(input.toString());
        let html   = file.replace(/.md$/i, '') + '.html';
        fs.writeFile(html, output, (err2) => {
            if ( err2 ) error('Can\'t save result to ' + html);
        });
    });

} else {
    error('Unknow command ' + command);
}

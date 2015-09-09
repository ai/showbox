import yargs from 'yargs';

import buildFile from './build-file';
import server    from './server';
import npm       from '../package';

let argv = yargs
    .usage('Usage: $0 COMMAND FILE')
    .example('$0 server talk.md')
    .example('$0 build talk.md')
    .command('build', 'Compile keynotes to HTML and put it in same dir')
    .command('server', 'Start server with live-reload')
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
    buildFile(file).catch( (err) => {
        if ( typeof err === 'string' ) {
            error(err);
        } else {
            error(err.stack);
        }
    });

} else if ( command === 'server' ) {
    if ( !file ) error('Keynotes file is missed');
    server(file, (err) => {
        if ( typeof err === 'string' ) {
            console.error(err);
        } else {
            console.error(err.stack);
        }
    });

} else {
    error('Unknow command ' + command);
}

import chalk from 'chalk';
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

function exitError(text) {
    console.error('showbox: ' + text);
    process.exit(1);
}

function processError(err) {
    if ( err.name === 'ShowboxError' ) {
        exitError(err.message);
    } else {
        exitError(err.stack);
    }
}

function colorError(text) {
    console.error(
        '[' + chalk.blue('showbox') + '] ' +
        chalk.red('Error: ') +
        chalk.yellow(text));
}

if ( command === 'build' ) {
    if ( !file ) exitError('Keynotes file is missed');
    buildFile(file).catch(processError);

} else if ( command === 'server' ) {
    if ( !file ) exitError('Keynotes file is missed');
    server(file, (critical, err) => {
        if ( critical ) {
            processError(err);
        } else if ( err.name === 'ShowboxError' ) {
            colorError(err.message);
        } else {
            colorError(err.stack);
        }
    });

} else {
    exitError('Unknow command ' + command);
}

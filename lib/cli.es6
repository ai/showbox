import yargs from 'yargs';

import npm from '../package';

let argv = yargs
    .help('h')
    .alias('h', 'help')
    .version( () => npm.name + ' ' + npm.version )
    .alias('v', 'version')
    .argv;

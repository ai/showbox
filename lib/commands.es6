import path from 'path';

import ShowboxError from './showbox-error';
import inlineImage  from './inline-image';

function parse(str) {
    let match = str.match(/!([^\s]+)(\s(.*))?$/);
    if ( match ) {
        return [match[1], match[3].trim()];
    } else {
        return [];
    }
}

function isCommand(node) {
    return node.type === 'paragraph' &&
           node.children[0].type === 'text' &&
           node.children[0].value[0] === '!';
}

function text(node) {
    let result = '';
    for ( let i of node.children ) {
        if ( i.type === 'text' ) result += i.value;
        if ( i.type === 'link' ) result += i.href;
    }
    return result;
}

export default function commands(root, base) {
    let changed = {
        type:     root.type,
        children: [],
        position: root.position
    };
    let data = { };

    let type = function (name) {
        if ( !data.types ) data.types = [];
        data.types.push(name);
    };
    let image = function (file, link) {
        let html = '<img src="' + inlineImage(path.join(base, file)) + '">';
        if ( link ) html = `<a href="${ link }">${ html }</a>`;
        changed.children.push({ type: 'html', value: html });
    };

    for ( let i of root.children ) {
        if ( isCommand(i) ) {
            let content = text(i);
            for ( let command of content.split('\n') ) {
                let [name, param] = parse(command.trim());

                if ( name === 'type' ) {
                    type(param);

                } else if ( name === 'image' ) {
                    image(...param.split(/\s+/));

                } else if ( name === 'cover' ) {
                    image(param);
                    type('cover');
                    type('h');

                } else if ( name === 'favicon' ) {
                    data.favicon = inlineImage(path.join(base, param));

                } else if ( name === 'theme' ) {
                    data.theme = param;

                } else {
                    throw new ShowboxError('Unknown command !' + name);
                }
            }

        } else {
            changed.children.push(i);
        }
    }

    return [changed, data];
}

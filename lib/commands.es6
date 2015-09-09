function parse(str) {
    let match = str.match(/!([^\s]+)(\s(.*))?/);
    if ( match ) {
        return [match[1], match[3]];
    } else {
        return [];
    }
}

function isCommand(node) {
    return node.type === 'paragraph' &&
           node.children[0].type === 'text' &&
           node.children[0].value[0] === '!';
}

function split(node) {
    return node.children[0].value.split('\n').map( s => s.trim() );
}

export default function commands(root) {
    let changed = {
        type:     root.type,
        children: [],
        position: root.position
    };
    let data = { };

    for ( let i of root.children ) {
        if ( isCommand(i) ) {
            for ( let command of split(i) ) {
                let [name, param] = parse(command);
                if ( name === 'type' ) {
                    if ( !data.types ) data.types = [];
                    data.types.push(param);
                } else {
                    data[name] = param;
                }
            }

        } else {
            changed.children.push(i);
        }
    }

    return [changed, data];
}

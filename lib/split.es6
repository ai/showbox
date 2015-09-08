function add(result, buffer, root) {
    result.push({
        type:     root.type,
        children: buffer,
        position: root.position
    });
}

export default function split(root) {
    let result = [];
    let buffer = [];

    for ( let node of root.children ) {
        if ( node.type === 'heading' && node.depth === 2 ) {
            add(result, buffer, root);
            buffer = [];
        }
        buffer.push(node);
    }
    add(result, buffer, root);

    return result;
}

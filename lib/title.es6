function text(node) {
    let result = '';
    for ( let i of node.children ) {
        if ( i.type === 'text' ) {
            result += i.value;
        } else {
            result += text(i);
        }
    }
    return result;
}

export default function title(root) {
    for ( let node of root.children ) {
        if ( node.type === 'heading' && node.depth === 1 ) {
            return text(node);
        }
    }
    return '';
}

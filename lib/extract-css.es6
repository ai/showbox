export default function extractCSS(root) {
    let changed = {
        type:     root.type,
        children: [],
        position: root.position
    };
    let style = '';

    for ( let i of root.children ) {
        if ( i.type === 'html' && i.value.indexOf('<style>') === 0 ) {
            style += i.value.replace(/<\/?style>/g, '');
        } else {
            changed.children.push(i);
        }
    }

    return [changed, style];
}

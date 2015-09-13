import hljs from 'highlight.js';

const aliases = {
    js: 'javascript'
};

export default function highlight(root) {
    let changed = {
        type:     root.type,
        children: [],
        position: root.position
    };

    for ( let i of root.children ) {
        if ( i.type === 'code' && i.lang ) {
            let lang = i.lang;
            if ( aliases[lang] ) lang = aliases[lang];

            let html = hljs.highlightAuto(i.value, [lang]).value;
            html = '<pre>' +
                html.split('\n').map( i => `<code>${ i }</code>` ).join('\n') +
            '</pre>';

            changed.children.push({ type: 'html', value: html });
        } else {
            changed.children.push(i);
        }
    }

    return changed;
}

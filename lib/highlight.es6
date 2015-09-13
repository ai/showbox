import hljs from 'highlight.js';

const aliases = {
    js: 'javascript'
};

function extractPoints(text) {
    let trimmed = '';
    let points  = [];

    var pos = 0;
    for ( var i = 0; i < text.length; i++ ) {
        if ( text.substr(i, 3) === '***' ) {
            points.push(pos);
            i += 2;
        } else {
            trimmed += text[i];
            pos     += 1;
        }
    }

    return [trimmed, points];
}

function markPoints(html, points) {
    let pos     = 0;
    let tag     = false;
    let next    = points.shift();
    let open    = true;
    let marked  = '';
    let escaped = false;

    for ( var i = 0; i < html.length; i++ ) {
        let char = html[i];
        marked += char;

        if ( tag ) {
            if ( char === '>' ) tag = false;
        } else if ( escaped ) {
            if ( char === ';' ) escaped = false;
        } else if ( char === '<' ) {
            tag = true;
        } else if ( char === '&' ) {
            escaped = true;
            pos    += 1;
        } else {
            pos += 1;
            if ( pos === next ) {
                if ( open ) {
                    marked += '<mark class="important">';
                    open = false;
                } else {
                    marked += '</mark>';
                    open = true;
                }
                next = points.shift();
            }
        }
    }

    return marked;
}

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

            let [code, points] = extractPoints(i.value);
            let html = hljs.highlightAuto(code, [lang]).value;
            html = markPoints(html, points);
            html = '<pre>' +
                html.split('\n')
                    .map( j => j.trim() === '' ? '&nbsp;' : j )
                    .map( j => `<code>${ j }</code>` ).join('\n') +
            '</pre>';

            changed.children.push({ type: 'html', value: html });
        } else {
            changed.children.push(i);
        }
    }

    return changed;
}

import nested       from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcss      from 'postcss';
import cssnano      from 'cssnano';

export default function compileCSS(talk, data) {
    let css = data.css + talk.css;
    for ( let i = 0; i < talk.slides.length; i++ ) {
        css += data.slide(i) + ' {' + talk.slides[i].css + '}';
    }

    let plugins = [
        nested,
        autoprefixer({ browsers: 'last 2 version' }),
        cssnano
    ];
    return postcss(plugins).process(css).then( (result) => {
        result.warnings().forEach( i => console.warn(i.toString()) );
        return { ...data, css: result.css };
    });
}

import autoprefixer from 'autoprefixer';
import postcss      from 'postcss';
import cssnano      from 'cssnano';

export default function compileCSS(data) {
    let plugins = [autoprefixer({ browsers: 'last 2 version' }), cssnano];
    return postcss(plugins).process(data.css).then( (result) => {
        return { ...data, css: result.css };
    });
}

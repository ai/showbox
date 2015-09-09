import mdastHTML from 'mdast-html';
import mdast     from 'mdast';

export default mdast().use(mdastHTML, { entities: 'escape' });

const prerender = require('../index.js');
const path = require('path');

prerender({
    staticDir: path.resolve(__dirname, './dist/'),
    outputDir: path.resolve(__dirname, './prerender'),
    routes: ['/tpx3Y.html'],
    postRender: (html) => {
        return html;
    }
}).then(console.log);
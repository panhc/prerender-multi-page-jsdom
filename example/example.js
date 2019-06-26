const prerender = require('../index.js');
const path = require('path');
prerender({
    staticDir: path.resolve(__dirname, './dist/'),
    routes: ['/tpx3Y.html']
}).then(console.log);
const Prerender = require('./prerender/lib/index');
const path = require('path');
const mkdirp = require('mkdirp')
const fs = require('fs');

async function PrerenderMultiPage(options = {}) {
    if (!options.staticDir || !options.routes) {
        throw new Error("staticDir and routes is required");
    }
    let staticDir = options.staticDir;
    let outputDir = options.outputDir || options.staticDir;
    let routes = options.routes;

    let _prerender = new Prerender({
        staticDir
    });

    await _prerender.initialize();
    try {
        let renderedRoutes = await _prerender.renderRoutes(routes);
        renderedRoutes.forEach(renderedRoute => {
            // console.log(renderedRoute.route);
            let _p = path.parse(renderedRoute.route);
            let _outputDir = path.join(outputDir, _p.dir);

            mkdirp.sync(_outputDir);

            fs.writeFileSync(path.resolve(_outputDir, _p.base), renderedRoute.html.trim());
        });
        _prerender.destroy();
        return true;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = PrerenderMultiPage;
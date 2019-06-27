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
    let postRender = options.postRender;

    let _prerender = new Prerender({
        staticDir
    });

    await _prerender.initialize();
    try {
        let renderedRoutes = await _prerender.renderRoutes(routes);
        for (let renderedRoute of renderedRoutes) {
            let _p = path.parse(renderedRoute.route);
            let _outputDir = path.join(outputDir, _p.dir);

            mkdirp.sync(_outputDir);

            let html = renderedRoute.html;
            if (postRender && typeof postRender === 'function') {
                html = await postRender(renderedRoute.html);
            }

            fs.writeFileSync(path.resolve(_outputDir, _p.base), html.trim());
        }

        _prerender.destroy();
        return true;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = PrerenderMultiPage;
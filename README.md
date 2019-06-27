## prerender-multi-page-puppeteer

本插件主要用于多页面渲染预渲染模式，主要代码源于@prerenderer/prerenderer（主要支持SPA渲染），经过改造而成。
使用JSDOM预渲染

使用方法：
```
const prerender = require('prerender-multi-page-jsdom');
const path = require('path');

prerender({
    staticDir: path.resolve(__dirname, './dist/'),
    outputDir: path.resolve(__dirname, './prerender'),
    routes: ['/tpx3Y.html'],
    postRender: (html) => {
        return html;
    }
}).then(console.log);
```

staticDir 资源所在地址，必须
outputDir 输出位置，非必须，默认资源位置
routes    路由， 必须
outputDir  函数，非必须，需要返回值，返回值将被写入文件


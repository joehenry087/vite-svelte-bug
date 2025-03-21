import express from 'express';
import helmet from 'helmet';
import {createServer as createViteServer} from 'vite'
import fs from 'node:fs/promises';

const server = express();

server.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrcElem: ["'self'", "'unsafe-inline'"],
            connectSrc: ["'self'", 'ws://localhost:24678'],
            upgradeInsecureRequests: null
        }
    }
}));

const vite = await createViteServer({
    server: { middlewareMode: true }
    , appType: 'custom'
    , logLevel: 'error'
})
server.use(vite.middlewares)

let foo = 1;

server.use('*all', async (req, res, next) => {
    const url = req.protocol + '://' + req.hostname + req.originalUrl;
    const state = {foo};
    try {
        const indexTemplate = await fs.readFile('./index.html', 'utf-8');
        const transformed = await vite.transformIndexHtml(url, indexTemplate)
        const { app } = await vite.ssrLoadModule('/source/entry-server.js');
        console.log('render', foo);
        const appHtml = await app(state);
        const html = transformed
            .replace(`<!--ssr-outlet-->`, appHtml.body)
            .replace(`<!--pre-loaded-state-->`, JSON.stringify(state));
        res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
        foo = 0;
    } catch (e) {
        vite.ssrFixStacktrace(e)
        next(e)
    }
})

server.listen(80, function() {
    console.log(`Server is running on port 80`);
});
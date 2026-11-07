const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.get('/healthz', (_req, res) => res.send('ok'));
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  // HTML is always revalidated so every launch gets the newest deploy.
  setHeaders: (res, file) =>
    res.setHeader('Cache-Control', file.endsWith('.html') ? 'no-cache' : 'public, max-age=86400'),
}));
app.listen(process.env.PORT || 3000, () => console.log('Serving The Last 6 Hours'));

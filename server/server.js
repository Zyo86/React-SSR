import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const PORT = 8000;

const app = express();

const router = app.router();

app.use('./build', express.static('build'));

app.get('*', (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf-8', (err, data) => {
    if (err) {
      console.log('Error');
      return res.status(500).send('oops !', 'error');
    }
    return res.send(
      data.replace(`<div id="root"></div>`, `<div id="root">${app}</div>`)
    );
  });
});

route.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '10d' })
);

app.use(router);

app.listen(PORT, () => {
  console.log('Listening to SSR on port : ' + PORT);
});

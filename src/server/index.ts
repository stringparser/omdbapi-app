import * as path from 'path';
import { NODE_ENV, NODE_PORT } from '../../config/env';

import * as Koa from 'koa';
import * as next from 'next';
import * as bodyParser from 'koa-bodyparser';

import { createRouter } from './router';

const app = next({
  dev: NODE_ENV !== 'production',
  dir: path.join(process.cwd(), 'src', 'client'),
});

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const router = createRouter(app);

    server.use(router.routes());
    server.use(bodyParser());

    server.listen(NODE_PORT, () => {
      console.log(`> Koa server listening http://localhost:${NODE_PORT}`);
    });
  })
;

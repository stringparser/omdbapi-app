import { Server } from 'next';
import * as Router from 'koa-router';

import { getMoviesByTitle, getMovieByID } from './api/OMDBAPIClient';
import { getMovieByIdRoute, getMoviesByTitleRoute, putMovieRoute } from '../client/api/routes';

export function createRouter(app: Server) {
  const router = new Router();
  const handle = app.getRequestHandler();

  router.get(getMovieByIdRoute(), async ctx => {
    const res = await getMovieByID(ctx.params.id);
    ctx.body = res.body || null;
    ctx.status = res.status;
  });

  router.get(getMoviesByTitleRoute(), async ctx => {
    const res = await getMoviesByTitle(ctx.query.q);
    ctx.body = res.body || null;
    ctx.status = res.status;
  });

  router.put(putMovieRoute(), async ctx => {
    ctx.body = 'ok';
    ctx.status = 200;
  })

  /**
   * Generic request handler for next used to:
   * - build pages on demand for development
   * - serve already build pages in production
   */
  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  return router;
}

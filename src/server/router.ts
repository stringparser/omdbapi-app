import { Server } from 'next';
import * as Router from 'koa-router';

export function createRouter(app: Server) {
  const router = new Router();
  const handle = app.getRequestHandler();

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

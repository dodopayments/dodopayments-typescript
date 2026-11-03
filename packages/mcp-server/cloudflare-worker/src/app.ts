import { Hono } from 'hono';
import { homeContent, layout } from './utils';

/** The home page. Each other path that the Worker does not serve gets 404. */
export const home = new Hono<{ Bindings: Env }>();

home.get('/', async (c) => c.html(layout(await homeContent(c.req.raw), 'Home')));

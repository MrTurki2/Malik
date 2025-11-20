import { Hono } from 'hono';

const app = new Hono();

// Serve static files from public directory
app.get('*', async (c) => {
  try {
    // Try to fetch from static assets
    const url = new URL(c.req.url);
    const assetResponse = await c.env.ASSETS.fetch(url);
    
    if (assetResponse.status === 404) {
      // If not found, try to serve index.html for SPA routing
      return await c.env.ASSETS.fetch(new URL('/index.html', url.origin));
    }
    
    return assetResponse;
  } catch (error) {
    return c.text('Error loading page', 500);
  }
});

export default app;


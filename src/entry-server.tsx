import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { siteConfig } from './config/site'
import { routes } from './routes'

/** Usado só no build (scripts/prerender.mjs) para gerar o HTML de cada página. */
export { headFor, pages, robotsTxt, sitemapXml } from './seo'

export async function render(path: string): Promise<string> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`${siteConfig.siteUrl}${path}`))
  if (context instanceof Response) throw new Error(`Rota ${path} respondeu com redirecionamento`)
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  )
}

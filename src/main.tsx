import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import { routes } from './routes'

const router = createBrowserRouter(routes)

// createRoot (e não hydrateRoot): o HTML pré-renderizado no build serve para buscadores e
// prévias de link; no navegador o React desenha de novo, já com a data de hoje e a busca da URL.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

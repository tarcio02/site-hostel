import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/Layout'
import { AccommodationDetail } from './pages/AccommodationDetail'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/** Rotas compartilhadas entre o navegador (main.tsx) e a pré-renderização do build (entry-server.tsx). */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/acomodacoes/:slug', element: <AccommodationDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

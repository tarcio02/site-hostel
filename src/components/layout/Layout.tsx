import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppFloat } from './WhatsAppFloat'

export function Layout() {
  return (
    <>
      <Header />
      <main id="conteudo" className="pt-[4.5rem]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      {/* volta ao topo ao trocar de página e rola até a âncora (#quartos…) quando houver */}
      <ScrollRestoration />
    </>
  )
}

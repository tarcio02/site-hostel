# Iniã Casa Hostel — site

Site do **Iniã Casa Hostel**, no Vale do Capão (Caeté-Açu, Palmeiras, Chapada Diamantina, BA).
Todo o conteúdo é em **português do Brasil**. A reserva é feita pelo **WhatsApp** (link `wa.me` com mensagem pronta).

**Etapa atual:** front-end completo com dados de exemplo. Não há backend nem consulta de disponibilidade: a disponibilidade é confirmada pelo WhatsApp.

## Stack

- React 19 + Vite + TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/vite`. Os tokens ficam em `@theme` no `src/index.css`; não existe `tailwind.config.js`
- React Router (`createBrowserRouter`) com as rotas `/`, `/acomodacoes/:slug` e `*` (404), definidas em `src/routes.tsx`
- **Pré-renderização no build:** `npm run build` gera um HTML pronto por página (`dist/index.html`, `dist/acomodacoes/<slug>.html`, `dist/404.html`), mais `sitemap.xml` e `robots.txt`. As meta tags, o canonical, o Open Graph e o JSON-LD de cada página ficam em `src/seo.ts`; o script é `scripts/prerender.mjs`, que usa `src/entry-server.tsx`. No navegador o React desenha de novo com `createRoot` (sem hidratação). Página nova = acrescentar em `pages` no `src/seo.ts`
- Deploy na Vercel: `vercel.json` com `cleanUrls` e **sem** rewrite geral; endereço inexistente recebe o `404.html` com status 404
- Imagens de prévia de link: `public/og/<id>.jpg` (1200x630, JPG). O endereço público fica em `siteConfig.siteUrl`
- **Sem bibliotecas extras de propósito.** Os ícones são SVGs próprios em `components/ui/Icon.tsx`; datas são tratadas em `lib/dates.ts`. Antes de adicionar uma dependência, confirme que ela é realmente necessária: a maioria dos visitantes chega pelo Instagram, no celular, muitas vezes com sinal fraco.

Comandos: `npm run dev`, `npm run build` (roda `tsc` e depois `vite build`), `npm run preview`.

## Princípios

- **Mobile-first.** Comece pelo layout de celular e acrescente `sm:`/`md:`/`lg:`.
- **Leveza:** imagens com `loading="lazy"` (componente `LazyImage`); só a imagem do hero é carregada de imediato. O mapa do Google só carrega quando o visitante clica.
- **Acessibilidade:** texto alternativo em todas as imagens; menu e acordeão navegáveis por teclado (`aria-expanded`/`aria-controls`, Esc fecha o menu); link "pular para o conteúdo"; foco visível.
- **Visual acolhedor, natural e artesanal** (o logo é em aquarela e mandala): cantos `rounded-artesanal`, manchas `.aquarela` (o elemento pai precisa da classe `isolate`), `MandalaDivider` entre título e texto. Nada com cara de template corporativo.
- **Não invente dados reais.** Tudo que depende de informação do hostel fica como `[PREENCHER]`. Para encontrar o que falta: `grep -rn "\[PREENCHER\]" src index.html`.

## Paleta (tokens do Tailwind)

| Token | Cor | Uso |
|---|---|---|
| `creme` | #FCEBD2 | fundo principal |
| `creme-claro` | #FFF8EE | fundo das seções alternadas, cards |
| `terracota` | #D53D17 | títulos, botão "Reservar", destaques |
| `terracota-escuro` | #B23312 | textos pequenos e links sobre creme |
| `laranja` | #F5A056 | detalhes, ícones, divisórias (**nunca** como cor de texto: contraste insuficiente) |
| `laranja-queimado` | #E07447 | hover dos botões |
| `marrom-texto` | #4A3426 | texto corrido |
| `marrom` | #956F51 | linhas e bordas |
| `rosa` #F5C2DB, `pessego` #F6B9A2, `verde` #C0B97D, `azul` #B5CDE0, `lilas` #AD78A0 | | acentos em pequenas doses (etiquetas dos quartos, ícones). Use `lilas` com opacidade quando houver texto por cima |
| `whatsapp` | #25D366 | **somente** nos botões do WhatsApp, com texto/ícone `marrom-texto` (branco sobre esse verde não tem contraste) |

Fontes: `font-display` = Fraunces (títulos) e `font-sans` = Nunito (texto), carregadas do Google Fonts no `index.html`.

## Estrutura

```
src/
  config/site.ts          nome, WhatsApp, e-mail, Instagram, endereço, horários, links do mapa
  types/index.ts          Accommodation, Photo, ISODate…
  data/accommodations.ts  as 4 acomodações (dados de exemplo)
  data/content.ts         textos das seções (estrutura, vale, rotas, avaliações, políticas, FAQ)
  lib/dates.ts            datas como string "AAAA-MM-DD" no horário local, noites, validação
  lib/whatsapp.ts         links wa.me e as mensagens
  lib/format.ts           preço em BRL e rótulo do tipo de quarto
  hooks/useSearchState.ts busca guardada na URL (?checkin=&checkout=&hospedes=)
  components/layout|ui|booking|accommodation
  sections/               uma seção da home por arquivo, na ordem de pages/Home.tsx
  pages/                  Home, AccommodationDetail, NotFound
public/logo.png, public/placeholders/*.svg (imagens provisórias)
```

## Datas e reserva (sem consulta de disponibilidade)

O site **não** consulta disponibilidade: não há API do Booking, iCal nem Supabase, e isso é decisão do projeto. Não reintroduza calendário de ocupação, "restam X camas" ou acomodações esmaecidas.

- O visitante escolhe datas e hóspedes (barra do hero ou página da acomodação). A busca fica na URL (`useSearchState`: `?checkin=&checkout=&hospedes=`) e acompanha a navegação até a página da acomodação.
- Na página da acomodação, o botão "Reservar pelo WhatsApp" (`BookingBox`) sempre funciona: com datas válidas, a mensagem leva o período; sem datas, pergunta de forma geral. O hostel responde se há vaga.
- Na página da acomodação, o número de hóspedes fica limitado à `capacity` dela.
- O check-in é incluído e o check-out não: a contagem de noites é `countNights(checkIn, checkOut)`.
- Datas no passado e check-out antes ou igual ao check-in são bloqueados nos campos (`min`) e rejeitados por `validateRange`.
- Datas são sempre strings `AAAA-MM-DD` no horário local. Não use `new Date('AAAA-MM-DD')`, porque isso interpreta a data em UTC e ela "volta um dia" no Brasil. Use as funções de `lib/dates.ts`.
- No celular os campos de data já têm a altura de duas linhas (`src/index.css`), porque o iOS quebra a data por extenso.

## WhatsApp

- Número em `siteConfig.whatsapp` (somente dígitos, com 55 e o DDD).
- Mensagem de reserva (`bookingMessage`), com singular e plural corretos:
  - com datas: `Olá! Tudo bem? Vim pelo site do Iniã e tenho interesse no *[nome]*. Ele está disponível de *[dd/mm]* a *[dd/mm]* ([N] noites) para *[N] pessoas*? Desde já, agradeço!`
  - sem datas: `Olá! Tudo bem? Vim pelo site do Iniã e tenho interesse no *[nome]*. Ele está disponível para *[N] pessoas*? Ainda estou definindo as datas.`
- Botão flutuante (em todas as páginas): `Olá! Vim pelo site do Iniã e gostaria de mais informações.`
- A mensagem passa sempre por `encodeURIComponent` (função `whatsappUrl`).

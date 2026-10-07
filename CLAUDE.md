# Iniã Casa Hostel — site

Site do **Iniã Casa Hostel**, no Vale do Capão (Caeté-Açu, Palmeiras, Chapada Diamantina, BA).
Todo o conteúdo é em **português do Brasil**. A reserva é feita pelo **WhatsApp** (link `wa.me` com mensagem pronta).

**Etapa atual:** front-end completo com dados de exemplo. Ainda **não** existe integração real.
Próximas etapas: calendário do Booking via iCal (função serverless na Vercel) e/ou Supabase.

## Stack

- React 19 + Vite + TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/vite`. Os tokens ficam em `@theme` no `src/index.css`; não existe `tailwind.config.js`
- React Router (`createBrowserRouter`) com as rotas `/`, `/acomodacoes/:slug` e `*` (404)
- Deploy na Vercel: o `vercel.json` reescreve tudo para `index.html` (SPA)
- **Sem bibliotecas extras de propósito.** Os ícones são SVGs próprios em `components/ui/Icon.tsx`; datas são tratadas em `lib/dates.ts`; o calendário é próprio. Antes de adicionar uma dependência, confirme que ela é realmente necessária: a maioria dos visitantes chega pelo Instagram, no celular, muitas vezes com sinal fraco.

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
  config/site.ts          nome, WhatsApp, e-mail, Instagram, endereço, horários, CNPJ/Cadastur, links do mapa
  types/index.ts          Accommodation, Booking, AvailabilityResult, DayAvailability…
  data/accommodations.ts  as 4 acomodações (dados de exemplo)
  data/bookings.mock.ts   reservas fictícias, geradas a partir da data de hoje
  data/content.ts         textos das seções (estrutura, vale, rotas, avaliações, políticas, FAQ)
  services/availability.ts  ÚNICO ponto de leitura de disponibilidade (ver abaixo)
  lib/dates.ts            datas como string "AAAA-MM-DD" no horário local, noites, validação
  lib/whatsapp.ts         links wa.me e as mensagens
  lib/format.ts           preço em BRL e rótulo do tipo de quarto
  hooks/useSearchState.ts busca guardada na URL (?checkin=&checkout=&hospedes=)
  hooks/useAvailability.ts  useAvailability (período) e useCalendar (noite a noite)
  components/layout|ui|booking|accommodation
  sections/               uma seção da home por arquivo, na ordem de pages/Home.tsx
  pages/                  Home, AccommodationDetail, NotFound
public/logo.png, public/placeholders/*.svg (imagens provisórias)
```

## Disponibilidade: decisão de arquitetura

**Toda a leitura de disponibilidade fica isolada em `src/services/availability.ts`.** Componentes e hooks só chamam:

- `getAvailability(checkIn, checkOut, guests): Promise<AvailabilityResult[]>`
- `getCalendar(accommodationId, from, to, guests): Promise<DayAvailability[]>`

As duas funções são assíncronas desde já. Por dentro, o módulo usa uma fonte de dados com a interface `AvailabilitySource`, que expõe `listBookings(from, to)` e devolve `Booking[]`. Hoje a fonte ativa é a `mockSource` (lê `data/bookings.mock.ts`). Para integrar o iCal do Booking ou o Supabase, crie uma nova fonte que devolva `Booking[]` e troque `activeSource`. **Componentes não devem mudar.** Nunca leia reservas, iCal ou Supabase direto de um componente.

### Regras

- A busca é por período: o check-in é incluído, o check-out não. **A noite do check-out não fica ocupada.**
- Uma acomodação só está disponível se estiver livre em **todas** as noites do período.
- **Dormitórios:** disponibilidade por cama. O resultado traz `freeUnits` (o menor número de camas livres entre as noites do período) e exige `freeUnits >= hóspedes`. Os cards mostram "restam X camas".
- **Quartos privativos:** disponibilidade pelo quarto inteiro (`units = 1`), respeitando `hóspedes <= capacity`. Se o número de hóspedes passar da capacidade, o status é `excede-capacidade`.
- Acomodações indisponíveis aparecem esmaecidas, com o texto "Indisponível nessas datas".
- Datas no passado e check-out antes ou igual ao check-in são bloqueados nos campos (`min`) e rejeitados por `validateRange`. O serviço também lança erro nesses casos.
- Datas são sempre strings `AAAA-MM-DD` no horário local. Não use `new Date('AAAA-MM-DD')`, porque isso interpreta a data em UTC e ela "volta um dia" no Brasil. Use as funções de `lib/dates.ts`.

### Observação para a integração com o iCal

O iCal do Booking informa apenas períodos bloqueados (VEVENT com DTSTART/DTEND, onde DTEND é o dia do check-out), e não quantas camas estão ocupadas. Para quartos privativos, cada VEVENT vira um `Booking` com `units: 1`. Para dormitórios, será preciso um feed por cama/unidade, ou guardar a ocupação no Supabase. Decida isso antes de implementar. A leitura do iCal deve rodar no servidor (função serverless em `/api`), porque o Booking não libera CORS e o link do iCal é privado.

## WhatsApp

- Número em `siteConfig.whatsapp` (somente dígitos, com 55 e o DDD).
- Mensagem de reserva (`bookingMessage`): `Olá! Vim pelo site e gostaria de reservar o *[nome]* de *[dd/mm]* a *[dd/mm]* ([N] noites) para *[N] pessoas*. Está disponível?`, com singular e plural corretos.
- Botão flutuante (em todas as páginas): `Olá! Vim pelo site do Iniã e gostaria de mais informações.`
- A mensagem passa sempre por `encodeURIComponent` (função `whatsappUrl`).

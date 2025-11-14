# CompressorBR

_CompressorBR_ é um compressor de áudio e vídeo 100% no navegador usando `ffmpeg.wasm`, com foco em privacidade, SEO e monetização por anúncios. A versão atual roda em Next.js 14, utiliza Tailwind + shadcn/ui e está pronta para ser implantada em Vercel ou Cloudflare Pages.

> English TL;DR: CompressorBR is a browser-only ffmpeg.wasm interface with ready-to-use presets (MP3 128/192, H.264 720p/480p, AAC extraction). It ships with SEO pages, ad placeholders, GA4 hooks and CI built-in.

## Demo local

```bash
pnpm install
pnpm dev
```

A aplicação sobe em `http://localhost:3000` com PWA, UTM tracking e placeholders de anúncios habilitados.

> Prefere `npm`? Use `npm install`, `npm run dev`, `npm run build` etc. O script `postinstall` já executa `node scripts/copy-ffmpeg.mjs` em ambos os casos.

> Nota: se o navegador bloquear o download do `ffmpeg-core` por CORS, execute `pnpm ffmpeg:copy` (ou aguarde o `postinstall`) para copiar os artefatos de `node_modules/@ffmpeg/core/dist` para `public/ffmpeg`, e garanta que `NEXT_PUBLIC_FFMPEG_BASE_URL=/ffmpeg/umd/`.

## Build e produção

```bash
pnpm build && pnpm start
```

O bundle é compatível com Vercel (`pnpm build` no build command e `pnpm start` no server) ou Cloudflare Pages (modo estático + adaptação de Edge). Configure as variáveis `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_HIDE_ADS_FOR_UTM`, `NEXT_PUBLIC_FFMPEG_BASE_URL` (por padrão `/ffmpeg/umd/`) e `NEXT_PUBLIC_ADSENSE_ID` nos ambientes desejados.

## Processamento local (privacidade)

- ffmpeg.wasm é carregado sob demanda e roda inteiramente no browser.
- Os artefatos `ffmpeg-core.js/.wasm/.worker` são servidos de `/public/ffmpeg`, evitando chamadas externas.
- Os arquivos nunca saem do dispositivo do usuário; apenas métricas GA4 são enviadas.
- O service worker cacheia `ffmpeg-core.js/.wasm`, assets próprios e entrega um fallback offline.

Reforce essa mensagem no marketing para alinhar expectativas de privacidade.

## Google Analytics 4

1. Crie um Measurement ID no GA4.
2. Defina `NEXT_PUBLIC_GA_MEASUREMENT_ID` no `.env` (exemplo em `.env.example`).
3. Eventos disponíveis: `upload_started`, `preset_selected`, `compression_completed`, `download_clicked`, `error` — todos enviam UTMs persistidos em `localStorage`.

## AdSense / Ezoic

Os componentes `src/components/ads/*` possuem comentários indicando onde inserir `adsbygoogle.push({...})`. Há três slots:

- `<AdTop />`: topo responsivo.
- `<AdInArticle />`: entre o upload e o resultado.
- `<AdAnchorMobile />`: âncora opcional apenas no mobile.

Respeite o rótulo “Publicidade” e evite encostar em botões. Para silenciar anúncios em campanhas específicas, use a flag `NEXT_PUBLIC_HIDE_ADS_FOR_UTM`.

[Guia rápido de blocos](ADSENSE-GUIDE.md) explica formatos recomendados para cada componente.

## Limitações conhecidas (ffmpeg.wasm)

- Arquivos muito grandes podem consumir muita RAM e travar o navegador, embora o app não imponha limites.
- Navegadores móveis muito antigos podem não suportar WebAssembly threading.
- A performance depende do hardware do usuário; ofereça mensagens de tempo estimado e feedbacks claros.

## Roadmap sugerido

- **v2**: múltiplos arquivos/filas com visualização em lote.
- **v3**: fallback Node.js/serverless para mídias gigantes (ex.: > 1 GB).
- **v4**: ferramentas irmãs (ex.: CompressorBR Photos, CompressorBR GIF) compartilhando o mesmo design system.

## Contribuição

1. Crie uma branch seguindo `tipo/descricao-curta` (ex.: `feature/multi-upload`).
2. Abra um PR descrevendo:
   - Contexto do problema.
   - Prints ou passos de teste.
   - Checklist de lint/test/build.
3. Todo PR roda `pnpm lint`, `pnpm test` e `pnpm build` via GitHub Actions.

Issues e discussões são bem-vindas; mantenha o respeito pelo código aberto.

## Como ativar SEO/PWA

- Metadados por página (`generateMetadata`/`metadata`) já configurados.
- Rotas estáticas PT-BR e /en espelhadas para SEO internacional.
- `public/manifest.json`, `public/sw.js` e ícones 192/512 prontos para Lighthouse PWA.

## Implantação

- **Vercel**: importe o repositório, defina as variáveis de ambiente e mantenha o build command `pnpm build`.
- **Cloudflare Pages**: utilize `npm run build` (ou `pnpm build`) e sirva a pasta `.next` via middleware/adapter oficial.

## MIT License

Distribuído sob a Licença MIT — veja `LICENSE`. Credite “CompressorBR (Open Source)” ao reutilizar.

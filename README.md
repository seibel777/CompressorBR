# 🎧 CompressorBR

**CompressorBR** é uma ferramenta **open source** para comprimir arquivos de **áudio e vídeo diretamente no navegador**, sem enviar nada para servidores.  
Desenvolvido em **Next.js + TypeScript + ffmpeg.wasm**, o projeto foca em **privacidade, performance e simplicidade**.

---

## 🚀 Recursos principais

- 🧠 **Processamento local** — Nenhum upload é feito. Todo o trabalho ocorre no seu navegador.  
- 🎵 **Presets prontos**:
  - MP3 128 kbps  
  - MP3 192 kbps  
  - MP4 720p (H.264, 2 Mbps)  
  - MP4 480p (H.264, 1 Mbps)  
  - Extrair áudio de vídeo (AAC 128 kbps)  
- ⚡ **Baseado em ffmpeg.wasm** — mesmo poder do FFmpeg em WebAssembly.  
- 📱 **Responsivo** — funciona em celular, tablet e desktop.  
- 🧩 **PWA** — pode ser instalado como app offline.  
- 💡 **Open Source (MIT License)** — use, modifique e contribua.  
- 🧭 **SEO e privacidade** — páginas estáticas, sem cookies de terceiros.  

---

## 🏗️ Tecnologias

| Categoria | Ferramenta |
|------------|-------------|
| Framework | [Next.js 14](https://nextjs.org/) |
| Linguagem | TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Processamento | [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) |
| Testes | Vitest + React Testing Library |
| CI/CD | GitHub Actions |
| Licença | MIT |

---

## 💻 Rodando localmente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/compressorbr.git
cd compressorbr

2️⃣ Instale as dependências

pnpm install
# ou npm install

3️⃣ Execute em modo desenvolvimento

pnpm dev
# depois acesse http://localhost:3000


⸻

🧠 Como funciona

O CompressorBR usa o poder do ffmpeg.wasm para realizar compressões localmente.
Isso significa:
	•	Nenhum arquivo é enviado a servidores.
	•	Todo o processamento acontece no seu dispositivo.
	•	Maior privacidade e velocidade para arquivos até ~300 MB (dependendo da RAM disponível).

Fluxo básico:
	1.	O usuário arrasta um arquivo.
	2.	O ffmpeg.wasm roda a compressão no navegador.
	3.	O arquivo comprimido é disponibilizado para download.

⸻

📦 Estrutura simplificada

src/
 ├─ app/
 │   ├─ page.tsx
 │   ├─ politica-de-privacidade/page.tsx
 │   └─ termos-de-uso/page.tsx
 ├─ components/
 │   ├─ Dropzone.tsx
 │   ├─ PresetSelect.tsx
 │   ├─ ProgressBar.tsx
 │   ├─ ResultCard.tsx
 │   └─ ads/
 │       ├─ AdTop.tsx
 │       └─ AdInArticle.tsx
 ├─ lib/
 │   ├─ ffmpegClient.ts
 │   ├─ analytics.ts
 │   └─ utils.ts
public/
 ├─ manifest.json
 └─ icons/


⸻

📊 GA4 e anúncios (opcional)
	•	Os anúncios (AdSense/Ezoic) são apenas placeholders.
Adicione seus blocos em components/ads/*.
	•	Integração do Google Analytics 4 via GA_MEASUREMENT_ID no .env.
	•	UTM parameters (utm_source, utm_medium, utm_campaign) são armazenados e enviados aos eventos GA.

⸻

📱 Instalação como PWA
	•	Adicione o app à tela inicial (Android, iOS ou Desktop).
	•	Funciona offline para compressões já em cache.
	•	manifest.json e service-worker.js já incluídos.

⸻

🧩 Roadmap
	•	✅ v1: Áudio + Vídeo (local, ffmpeg.wasm)
	•	🚧 v2: Compressão múltipla e fila
	•	🔜 v3: Modo “Turbo” (processamento servidor Node/FFmpeg)
	•	🔜 v4: Ferramentas irmãs (Conversor de formato, Normalizador, Cortador)

⸻

🛡️ Política de privacidade

O CompressorBR processa seus arquivos localmente no navegador, sem enviar dados para servidores.
Anúncios e integrações analíticas respeitam as políticas do Google e não armazenam arquivos do usuário.

⸻

🤝 Contribuindo

Contribuições são bem-vindas!
	1.	Faça um fork do repositório.
	2.	Crie sua branch (git checkout -b feature/nova-funcionalidade).
	3.	Commit (git commit -m 'Adiciona nova feature').
	4.	Push (git push origin feature/nova-funcionalidade).
	5.	Abra um Pull Request.

⸻

📄 Licença

Este projeto é licenciado sob a MIT License — veja o arquivo LICENSE para mais detalhes.

⸻

🌐 Links úteis
	•	Site oficial: https://compressorbr.com
	•	Autor: João Pedro Seibel
	•	GitHub: github.com/seibel777/compressorbr

⸻

💬 Frase de destaque

“Comprimir seus arquivos nunca foi tão fácil, nem tão privado.” 🔒
Feito com ♥ no Brasil.

---

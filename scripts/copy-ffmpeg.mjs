import { access, constants, cp, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const CORE_VERSION = '0.12.6';
const CORE_FILES = ['ffmpeg-core.js', 'ffmpeg-core.wasm', 'ffmpeg-core.worker.js'];

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const source = resolve(projectRoot, 'node_modules/@ffmpeg/core/dist');
const target = resolve(projectRoot, 'public/ffmpeg');

async function main() {
  await mkdir(target, { recursive: true });

  if (await exists(source)) {
    await cp(source, target, { recursive: true });
    console.log(`[copy-ffmpeg] Conteúdo copiado de ${source} para ${target}`);
  } else {
    console.warn('[copy-ffmpeg] Pasta local não encontrada. Tentando baixar do unpkg…');
  }

  await ensureLocalFiles();
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureLocalFiles() {
  const missing = [];
  for (const file of CORE_FILES) {
    if (!(await exists(resolve(target, file)))) {
      missing.push(file);
    }
  }

  if (!missing.length) {
    console.log('[copy-ffmpeg] Arquivos principais já estão presentes.');
    return;
  }

  console.warn('[copy-ffmpeg] Arquivos ausentes detectados:', missing.join(', '));
  await downloadFromCdn(missing);
}

async function downloadFromCdn(files = CORE_FILES) {
  const baseUrl = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/`;
  for (const file of files) {
    const url = `${baseUrl}${file}`;
    const dest = resolve(target, file);
    await downloadFile(url, dest);
    console.log(`[copy-ffmpeg] Baixado ${url} -> ${dest}`);
  }
}

function downloadFile(url, dest) {
  return new Promise((resolvePromise, rejectPromise) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          rejectPromise(new Error(`Request failed for ${url} (${res.statusCode})`));
          res.resume();
          return;
        }

        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', async () => {
          try {
            await writeFile(dest, Buffer.concat(chunks));
            resolvePromise();
          } catch (error) {
            rejectPromise(error);
          }
        });
      })
      .on('error', rejectPromise);
  });
}

main().catch((error) => {
  console.error('[copy-ffmpeg] Falhou ao copiar/baixar core', error);
  process.exitCode = 1;
});

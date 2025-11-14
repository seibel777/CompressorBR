import Link from 'next/link';
import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl">
        <Ghost className="mx-auto h-12 w-12 text-brand" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Erro 404</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Página não encontrada</h1>
        <p className="mt-2 text-sm text-slate-500">
          O link que você tentou acessar não existe ou foi movido. Volte para a home e continue comprimindo
          seus arquivos com segurança.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm"
          >
            Ir para página inicial
          </Link>
          
        </div>
      </div>
    </section>
  );
}

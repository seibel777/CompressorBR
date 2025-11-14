interface AdProps {
  hidden?: boolean;
}

export function AdInArticle({ hidden }: AdProps) {
  if (hidden) return null;
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/80 p-3 text-center text-xs text-slate-500">
      <p className="font-semibold text-slate-600">Publicidade</p>
      <div className="mt-2 h-24 rounded-2xl bg-slate-100" aria-label="Slot in-article">
        {/* Espaço reservado para anúncios responsivos */}
      </div>
    </section>
  );
}

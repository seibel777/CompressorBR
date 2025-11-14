interface AdProps {
  hidden?: boolean;
}

export function AdAnchorMobile({ hidden }: AdProps) {
  if (hidden) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-20 w-[90%] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 p-3 text-center text-xs text-slate-500 shadow-xl md:hidden">
      <p className="font-semibold text-slate-600">Publicidade</p>
      <div className="mt-2 h-12 rounded-xl bg-slate-100" aria-label="Ancora mobile">
        {/* Coloque o script ankora mobile aqui quando disponível */}
      </div>
    </div>
  );
}

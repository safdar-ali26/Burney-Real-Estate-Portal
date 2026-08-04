type Props = {
  languages?: string[];
};

export default function AgentLanguages({ languages = [] }: Props) {
  if (languages.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
        Languages
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {languages.map((language) => (
          <span
            key={language}
            className="rounded-md border border-[#EBCB4C]/20 bg-[#EBCB4C]/10 px-2 py-1 text-[11px] font-medium text-[#EBCB4C]"
          >
            {language}
          </span>
        ))}
      </div>
    </div>
  );
}
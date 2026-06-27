export default function PublicBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full border border-[#EBCB4C]/30 bg-[#EBCB4C]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#EBCB4C] ${className}`}
    >
      {children}
    </span>
  );
}
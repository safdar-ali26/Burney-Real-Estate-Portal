export default function PublicBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full border border-[#EBCB4C]/25 bg-[#EBCB4C]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#EBCB4C] ${className}`}
    >
      {children}
    </span>
  );
}
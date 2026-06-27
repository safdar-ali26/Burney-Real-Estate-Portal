export default function PublicCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-xl transition hover:border-[#EBCB4C]/40 ${className}`}
    >
      {children}
    </div>
  );
}
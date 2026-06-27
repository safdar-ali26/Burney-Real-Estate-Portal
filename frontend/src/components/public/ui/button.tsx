import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

export default function PublicButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-bold transition";

  const variants = {
    primary: "bg-[#EBCB4C] text-black hover:opacity-90",
    secondary: "bg-white/10 text-white hover:bg-[#EBCB4C]/10 hover:text-[#EBCB4C]",
    outline:
      "border border-[#EBCB4C]/40 text-[#EBCB4C] hover:bg-[#EBCB4C] hover:text-black",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
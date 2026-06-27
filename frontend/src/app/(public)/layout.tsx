import PublicFooter from "@/components/public/layout/footer";
import PublicHeader from "@/components/public/layout/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors">
      <PublicHeader />
      {children}
      <PublicFooter />
    </main>
  );
}
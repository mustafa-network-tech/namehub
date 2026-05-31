import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SavedVault from "@/components/ui/SavedVault";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SavedVault />
    </>
  );
}

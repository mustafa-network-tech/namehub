import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SavedVault from "@/components/ui/SavedVault";

export default function TrLayout({
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

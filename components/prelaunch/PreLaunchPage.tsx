import DarkHero from "@/components/prelaunch/DarkHero";
import PreLaunchFooter from "@/components/prelaunch/PreLaunchFooter";
import WhatsAppFab from "@/components/prelaunch/WhatsAppFab";

export default function PreLaunchPage() {
  return (
    <div>
      {/* Koyu, sinematik hero (kayan yazılar ve sayaç içeride) */}
      <DarkHero />

      <PreLaunchFooter />

      {/* Sağ altta sade WhatsApp ikonu */}
      <WhatsAppFab />
    </div>
  );
}

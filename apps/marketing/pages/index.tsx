import { HeroSection } from "../components/HeroSection/HeroSection";
import { InfoBar } from "../components/InfoBar/InfoBar";
import { Values } from "../components/Values/Values";
import { WorksSection } from "../components/WorksSection/WorksSection";
import NavBar from "../components/NavBar/NavBar";
import Features from "../components/Features/Features";
import Orga from "../components/Orga/Orga";
import GetStarted from "../components/GetStarted/GetStarted";
import CommunitySection from "../components/CommunitySection/CommunitySection";

export default function MarketingPage() {
  return (
    <div className="theme-dark text-textPrimary font-outfit overflow-x-hidden bg-background">
      <div className="fixed z-50">
        <NavBar />
      </div>
      <div className="flex flex-col">
        <HeroSection />
        <InfoBar />
        <Values />
        <WorksSection />
        <Features />
        <Orga />
        <GetStarted />
        <CommunitySection />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

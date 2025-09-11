import EthiopianHeader from "@/components/ethiopian/EthiopianHeader";
import EthiopianHero from "@/components/ethiopian/EthiopianHero";
import KeyFeatures from "@/components/ethiopian/KeyFeatures";
import AboutSection from "@/components/ethiopian/AboutSection";
import HowItWorksSection from "@/components/ethiopian/HowItWorksSection";
import FeaturedExams from "@/components/ethiopian/FeaturedExams";
import SuccessStories from "@/components/ethiopian/SuccessStories";
import StatsSection from "@/components/ethiopian/StatsSection";
import PartnersSection from "@/components/ethiopian/PartnersSection";
import EthiopianFooter from "@/components/ethiopian/EthiopianFooter";

const EthiopianIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <EthiopianHeader />
      <EthiopianHero />
      <KeyFeatures />
      <AboutSection />
      <HowItWorksSection />
      <FeaturedExams />
      <SuccessStories />
      <StatsSection />
      <PartnersSection />
      <EthiopianFooter />
    </div>
  );
};

export default EthiopianIndex;
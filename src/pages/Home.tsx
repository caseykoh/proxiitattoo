import ArtBanner from "../components/ArtBanner/ArtBanner";
import { WorkSection } from "../components/WorkSection/WorkSection";
import "./Home.css";
import "../components/ArtBanner/ArtBanner.css";
import FlashSection from "../components/FlashSection/FlashSection";
import TourSection from "../components/TourSection/TourSection";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const banner = useRef<HTMLDivElement>(null);
  const workSection = useRef<HTMLDivElement>(null);
  useGSAP(() => {});

  return (
    <>
      <div className="main-view">
        <div ref={banner}>
          <ArtBanner></ArtBanner>
        </div>
        <div ref={workSection}>
          <WorkSection></WorkSection>
        </div>
        <TourSection></TourSection>
        <FlashSection></FlashSection>
      </div>
    </>
  );
};

export default Home;

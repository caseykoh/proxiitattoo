import ArtBanner from "../components/ArtBanner/ArtBanner";
import StorySection from "../components/StorySection/StorySection";
import { WorkSection } from "../components/WorkSection/WorkSection";
import "./Home.css";
import "../components/ArtBanner/ArtBanner.css";
import { useEffect, useState } from "react";
import FlashSection from "../components/FlashSection/FlashSection";
import TourSection from "../components/TourSection/TourSection";
import CalendarSection from "../components/CalendarSection/CalendarSection";

const Home = () => {
  // const [, setScrollable] = useState(false);

  // useEffect(() => {
  //   //disable scrolling for 2 seconds
  //   document.body.style.overflow = "hidden";

  //   const timeout = setTimeout(() => {
  //     setScrollable(true);
  //     document.body.style.overflow = "auto";
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <>
      <div className="main-view">
        <ArtBanner></ArtBanner>
        <WorkSection></WorkSection>
        {/* <StorySection></StorySection> */}
        <TourSection></TourSection>
        <FlashSection></FlashSection>
        <CalendarSection></CalendarSection>
      </div>
    </>
  );
};

export default Home;

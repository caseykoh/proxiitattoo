import ArtBanner from "../components/ArtBanner/ArtBanner";
import StorySection from "../components/StorySection/StorySection";
import { WorkSection } from "../components/WorkSection/WorkSection";
import "./Home.css";
import "../components/ArtBanner/ArtBanner.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [, setScrollable] = useState(false);

  useEffect(() => {
    //disable scrolling for 2 seconds
    document.body.style.overflow = "hidden";

    const timeout = setTimeout(() => {
      setScrollable(true);
      document.body.style.overflow = "auto";
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="main-view">
        <div className="main-container">
          <ArtBanner></ArtBanner>
          <WorkSection></WorkSection>
          <StorySection></StorySection>
        </div>
      </div>
    </>
  );
};

export default Home;

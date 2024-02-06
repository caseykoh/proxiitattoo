import ArtBanner from "../components/ArtBanner/ArtBanner";
import StorySection from "../components/StorySection/StorySection";
import { WorkSection } from "../components/WorkSection/WorkSection";

const Home = () => {
  return (
    <>
      <div className="mainView">
        <ArtBanner></ArtBanner>
        <WorkSection></WorkSection>
        <StorySection></StorySection>
      </div>
    </>
  );
};

export default Home;

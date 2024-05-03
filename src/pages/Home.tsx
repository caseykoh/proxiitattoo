import ArtBanner from "../components/ArtBanner/ArtBanner";
import { WorkSection } from "../components/WorkSection/WorkSection";
import "./Home.css";
import "../components/ArtBanner/ArtBanner.css";
import FlashSection from "../components/FlashSection/FlashSection";
import TourSection from "../components/TourSection/TourSection";

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
        <TourSection></TourSection>
        <FlashSection></FlashSection>
      </div>
    </>
  );
};

export default Home;

import "./FlashPage.css";
import flashImages from "../components/FlashImages.tsx";
import MasonryBase from "../components/MasonryBase.tsx";

const FlashPage = () => {
  return (
    <MasonryBase images={flashImages} columnsDefault={4} columnsMobile={2}>
      {/* You can pass additional content here if needed */}
      <h1>Available Flash</h1>
    </MasonryBase>
  );
};

export default FlashPage;

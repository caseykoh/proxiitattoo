import "./FlashPage.css";
import flashImages from "../components/FlashImages.tsx";
import GalleryBase from "../components/GalleryBase.tsx";

const FlashPage = () => {
  return (
    <GalleryBase images={flashImages} columnsDefault={4} columnsMobile={2}>
      {/* You can pass additional content here if needed */}
      <h1>Available Flash</h1>
    </GalleryBase>
  );
};

export default FlashPage;

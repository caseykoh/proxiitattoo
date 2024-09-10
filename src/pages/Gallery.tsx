import "./Gallery.css";
import workImages from "../components/SelectWorkImages.tsx";
import TestImages from "../components/TestImages.tsx";
import GalleryBase from "../components/GalleryBase.tsx";

const Gallery = () => {
  return (
    <GalleryBase images={TestImages} columnsDefault={4} columnsMobile={2} />
  );
};

export default Gallery;

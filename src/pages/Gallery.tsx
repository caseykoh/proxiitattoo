import "./Gallery.css";
import workImages from "../components/SelectWorkImages.tsx";
import TestImages from "../components/TestImages.tsx";
import MasonryBase from "../components/MasonryBase.tsx";
import { useEffect } from "react";
import goToTop from "../GoToTop.tsx";

const Gallery = () => {
  useEffect(() => {
    goToTop();
  }, []);

  return (
    <section className="gallery-container">
      <div className="photo-grid">
        {workImages?.map((img, i) => (
          <div className="card" key={i}>
            <img
              width="400"
              height="400"
              alt={img.alt}
              src={img.src}
              loading={i > 3 ? "lazy" : "eager"}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

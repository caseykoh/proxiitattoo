import "./Gallery.css";
import workImages from "../components/SelectWorkImages.tsx";
import { useEffect } from "react";
import goToTop from "../GoToTop.tsx";

const Gallery = () => {
  useEffect(() => {
    goToTop();
  }, []);
  return (
    <section className="gallery-container">
      <section className="photo-grid">
        {workImages?.map((img, i) => (
          <div className="card" key={i}>
            <img width="400" height="400" src={img} loading="lazy" />
          </div>
        ))}
      </section>
    </section>
  );
};

export default Gallery;

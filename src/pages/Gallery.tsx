import "./Gallery.css";
import workImages from "../components/SelectWorkImages.tsx";

const Gallery = () => {
  return (
    <section className="gallery-container">
      <section className="photo-grid">
        {workImages?.map((img, i) => (
          <div className="card" key={i}>
            <img src={img} loading="lazy" />
          </div>
        ))}
      </section>
    </section>
  );
};

export default Gallery;

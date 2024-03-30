import "./Gallery.css";
import workImages from "../components/SelectWorkImages.tsx";

const Gallery = () => {
  return (
    <section className="gallery-container">
      <section className="photo-grid">
        {workImages?.map((img) => (
          <div className="card">
            <img src={img} />
          </div>
        ))}
      </section>
    </section>
  );
};

export default Gallery;

import "./FlashPage.css";
import flashArr from "../components/FlashImages.tsx";

const FlashPage = () => {
  return (
    <section className="gallery-container">
      <h1>Flash Designs</h1>
      <p>Available for booking.</p>
      <section className="photo-grid">
        {flashArr?.map((flashImg) => (
          <div className="card flash-card">
            <img src={flashImg.image} />
            <div className="img-caption">
              <p>{flashImg.title}</p>
              <button className="book-btn">book flash</button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default FlashPage;

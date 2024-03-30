import "./FlashPage.css";
import flashImages from "../components/FlashImages.tsx";

const FlashPage = () => {
  return (
    <section className="gallery-container">
      <h1>Flash Designs</h1>
      <p>Available for booking.</p>
      <section className="photo-grid">
        {flashImages?.map((flashImg) => (
          <div className="card flash-card">
            <img src={flashImg.image} />
            <div className="img-caption">
              <button className="book-btn">{"[ request flash ]"}</button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default FlashPage;

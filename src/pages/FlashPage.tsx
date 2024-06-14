import "./FlashPage.css";
import flashImages from "../components/FlashImages.tsx";
import { Link } from "react-router-dom";

const FlashPage = () => {
  return (
    <section className="gallery-container">
      <h1>Flash</h1>
      {/* <p>Available for booking.</p> */}
      <section className="photo-grid">
        {flashImages?.map((flashImg, i) => (
          <div className="card flash-card" key={i}>
            <img src={flashImg.image} loading="lazy" />
            <div className="img-caption">
              <button className="book-btn">
                <Link to={"/booking"} state={{ flashImg: flashImg.image }}>
                  {"[request flash]"}
                </Link>
              </button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default FlashPage;

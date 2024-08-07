import "./FlashPage.css";
import flashImages from "../components/FlashImages.tsx";
import { useEffect } from "react";
import goToTop from "../GoToTop.tsx";

const FlashPage = () => {
  useEffect(() => {
    goToTop();
  }, []);
  return (
    <section className="gallery-container">
      <h1>Flash</h1>
      <p>Available flash. Flash can be modified to fit your idea/placement.</p>
      {/* <p>Available for booking.</p> */}
      <section className="photo-grid">
        {flashImages?.map((flashImg, i) => (
          <div className="card flash-card" key={i}>
            <img
              width="400"
              height="400"
              alt={flashImg.alt}
              src={flashImg.image}
              loading={i > 1 ? "lazy" : "eager"}
            />
            {/* <div className="img-caption">
              <Link
                className="book-btn"
                to={"/booking"}
                state={{
                  flashImg: new URL(flashImg.image, document.baseURI).href,
                }}
              >
                {"[request flash]"}
              </Link>
            </div> */}
          </div>
        ))}
      </section>
    </section>
  );
};

export default FlashPage;

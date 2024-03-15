import "./ArtBanner.css";
import { IoChevronDown } from "react-icons/io5";
import workCollage from "../../assets/collage.png";

function ArtBanner() {
  return (
    <>
      <main className="art-banner-container">
        <div className="title-flex-container">
          <div className="main-title">
            {/* <img className="banner-img" src={workCollage} /> */}
            <div className="first-header">
              <h1 className="blur-text">PROXII</h1>
            </div>
            <div className="second-header">
              <h1 className="blur-text">WORLD</h1>
            </div>
            <hr className="horizontal-line" />
            <div className="banner-description">
              <div className="banner-description-text">
                <p className="blur-text">
                  <b>proxii_dream</b>
                </p>
                <p className="blur-text">
                  <em>Proxii World</em>, 2024
                </p>
                <p className="blur-text">Code</p>
                <p className="blur-text">235 MB</p>
              </div>
            </div>
          </div>
        </div>

        <div id="scroll-down-link">
          <a href="#work-section">
            <IoChevronDown />
          </a>
        </div>
      </main>
    </>
  );
}

export default ArtBanner;

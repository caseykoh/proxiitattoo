import "./ArtBanner.css";
import proxii_header from "../../assets/proxii_header.png";
import world_header from "../../assets/world_header.png";

function ArtBanner() {
  return (
    <>
      <main className="art-banner-container">
        <div className="main-title">
          <div className="first-header">
            <img src={proxii_header} />
          </div>
          <div className="second-header">
            <img src={world_header} />
          </div>
        </div>
        <div className="banner-description">
          <p>
            <b>proxii_dream</b>
          </p>
          <p>
            <em>Proxii World</em>, 2024
          </p>
          <p>Code</p>
          <p>235 MB</p>
        </div>
      </main>
    </>
  );
}

export default ArtBanner;

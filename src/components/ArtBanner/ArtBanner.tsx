import "./ArtBanner.css";

function ArtBanner() {
  return (
    <>
      <main className="art-banner-container">
        <div className="main-title">
          <div className="first-header">
            <img
              width="250"
              height="250"
              alt="proxii"
              src="/assets/proxii_header.png"
            />
          </div>
          <div className="second-header">
            <img
              width="250"
              height="250"
              alt="world"
              src="/assets/world_header.png"
            />
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

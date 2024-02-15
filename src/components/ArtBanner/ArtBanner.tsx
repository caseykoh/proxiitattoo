import "./ArtBanner.css";
import { IoChevronDown } from "react-icons/io5";

function ArtBanner() {
  return (
    <>
      {/* <div className="svgContainer">
        <svg viewBox="0 0 200 100">
          <filter
            id="noise"
            // x="0%"
            // y="0%"
            // width="100%"
            // height="100%"
            color-interpolation-filters="sRGB"
          >
            <feTurbulence
              result="NOISE"
              type="turbulence"
              numOctaves="2"
              baseFrequency="0.03"
            ></feTurbulence>

            <feColorMatrix
              in="NOISE"
              type="hueRotate"
              values="0"
              result="cloud"
            >
              <animate
                attributeName="values"
                from="0"
                to="360"
                dur="12s"
                repeatCount="indefinite"
              />
            </feColorMatrix>

            <feColorMatrix
              in="cloud"
              result="wispy"
              type="matrix"
              values="4 1 0 0 -1
            2 1 1 0 0
            3 0 3 1 -1
            3 0 0 1 -1   
            "
            />

            <feFlood flood-color="#0e1204" result="blue" />

            <feBlend mode="screen" in2="blue" in="wispy" />

            <feGaussianBlur stdDeviation="0.8" />

            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
          <image
            href="https://images-prod.dazeddigital.com/700/azure/dazed-prod/1280/0/1280529.jpg"
            filter="url(#noise)"
          ></image>
        </svg>
      </div> */}
      <main className="art-banner-container">
        <div className="main-title">
          <h1 className="first-text">PROXII</h1>
          <hr className="horizontal-line" />
          <h1 className="second-text">WORLD</h1>
          {/* <h2>world</h2> */}
        </div>
        <hr className="horizontal-line" />
        <hr className="vertical-line" />
        {/* <div className="main-links">
          <div className="book-tattoo-link">{"BOOK > TATTOO"}</div>
          <div className="view-gallery-link">{"VIEW > GALLERY"}</div>
        </div> */}
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

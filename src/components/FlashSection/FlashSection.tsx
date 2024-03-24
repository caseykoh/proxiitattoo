import { NavLink } from "react-router-dom";
import "./FlashSection.css";

function FlashSection() {
  return (
    <>
      <section className="flash-section">
        <div className="stack">
          <div className="page" id="page1"></div>
          <div className="page" id="page2"></div>
          <div className="page" id="page3"></div>
        </div>
        <NavLink to="/gallery" className="flash-link">
          see flash
        </NavLink>
      </section>
    </>
  );
}

export default FlashSection;

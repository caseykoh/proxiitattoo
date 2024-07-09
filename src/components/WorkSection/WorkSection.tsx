import "./WorkSection.css";
import { NavLink } from "react-router-dom";

export const WorkSection = () => {
  return (
    <>
      <section id="work-section" className="work-gallery">
        <div className="work-container">
          <div className="mission-statement">
            <p>
              proxii_world is a figment of imagination, a proxii_dream, where
              proxii lies in the silent, the invisible. sometimes i lie and
              wonder if i've been replaced with a proxii, one that would feel
              lucky to have this body.
            </p>
          </div>
          <div className="general-info-div">
            <a
              className="instagram-link"
              href="https://www.instagram.com/proxii_dream/"
              target="_blank"
            >
              @proxii_dream
            </a>
            <p>toronto,on</p>
          </div>
          <div className="work-gallery-grid">
            <img
              width="400"
              height="400"
              alt="A large tattoo of a fern on a back"
              src="/assets/IMG_2348.jpg"
            />
            <img
              width="400"
              height="400"
              alt="An organic tattoo on the hip"
              src="/assets/cool_work.jpg"
            />
            <img
              width="400"
              height="400"
              alt="A closeup of an abstract tattoo on the shoulder"
              src="/assets/IMG_2717.jpg"
            />
          </div>
          <NavLink to="/gallery" className="gallery-link">
            view select work
          </NavLink>
          {/* <div className="work-gallery-box">
          <img src="https://images.unsplash.com/photo-1578320339911-5e7974b2720a?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
        <div className="work-gallery-box">
          <img src="https://images.unsplash.com/photo-1582201943021-e8e5cb6dedc2?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div> */}
        </div>
      </section>
    </>
  );
};

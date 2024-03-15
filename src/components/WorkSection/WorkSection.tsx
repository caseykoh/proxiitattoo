import "./WorkSection.css";
import workCollage from "../../assets/collage.png"; // Adjust the path as needed

export const WorkSection = () => {
  return (
    <>
      <section id="work-section" className="work-gallery">
        <div className="work-gallery-box">
          <img src={workCollage} />
        </div>
        {/* <div className="work-gallery-box">
          <img src="https://images.unsplash.com/photo-1578320339911-5e7974b2720a?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
        <div className="work-gallery-box">
          <img src="https://images.unsplash.com/photo-1582201943021-e8e5cb6dedc2?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div> */}
      </section>
    </>
  );
};

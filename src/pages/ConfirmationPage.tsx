import "./ConfirmationPage.css";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const ConfirmationPage = () => {
  return (
    <>
      <section className="confirmation-section">
        <div className="confirmation-container">
          <IoCheckmarkCircleSharp className="confirmation-icon" />
          <h2>
            Your submission has been received and a response will be sent to
            your email soon.
          </h2>
          <p>
            In the meantime, feel free to check{" "}
            <a
              className="instagram-link"
              href="https://www.instagram.com/proxii_dream/"
              target="_blank"
            >
              @proxii_dream
            </a>{" "}
            for updates.
          </p>
        </div>
      </section>
    </>
  );
};

export default ConfirmationPage;

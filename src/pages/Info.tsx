import { useEffect } from "react";
import "./Info.css";
import goToTop from "../GoToTop";

const Info = () => {
  useEffect(() => {
    goToTop();
  }, []);
  return (
    <>
      <main className="info-page">
        <section className="info-section">
          <p className="info-text">
            Welcome to PROXII_WORLD. Here lives the sounds and whispers of this
            invisible world, manifested into ink on skin.
          </p>
          <p className="info-text">
            Pulling textures and elements from organic forms, I create tattoos
            that blend with the body's natural flow. My approach is grounded in
            collaboration and innovation, aiming to bring the internal rhythms
            of the body to the surface.
          </p>
        </section>
        <section className="tattoo-faq">
          <details>
            <summary>How do I book?</summary>
            <p>
              Send me a dm on Instagram @proxii_dream. Please detail your design
              idea, placement and size. I will get back to you with my next
              availability. Feel free to send images of designs/works from my
              page.
            </p>
          </details>
          <details>
            <summary>Where are you located?</summary>
            <p>
              I work out of @000000000000_studio, a private studio in downtown
              Toronto.
            </p>
          </details>
          <details>
            <summary>How much do you charge?</summary>
            <p>
              I charge a flat fee for every piece, which you may inquire during
              the consultation process. I take into account: placement, size and
              design - so please provide as much information as you can when
              inquiring.
            </p>
          </details>
          <details>
            <summary>Do you take a deposit?</summary>
            <p>A $50 CAD deposit is required to secure your appointment.</p>
          </details>
          <details>
            <summary>Cancellation Policy?</summary>
            <p>
              Deposits are non-refundable after 24 hours of booking. In the case
              that you need to cancel an appointment, please let me know as soon
              you possible.
            </p>
          </details>
          <details>
            <summary>What kind of styles do you do?</summary>
            <p>
              I specialize in black and grey abstract pieces that flow with your
              anatomy. I draw most of my designs on paper, giving it a raw and
              organic quality. My work is characterized by ethereal, dynamic
              textures that evoke notes of softness, expansion, and sound.
            </p>
          </details>
          <details>
            <summary>Do you do custom tattoos?</summary>
            <p>
              Yes, I do flash, custom and freehand tattoos. I'm pretty flexible
              with my flash designs, as well.
            </p>
          </details>
          <details>
            <summary>What are freehand tattoos?</summary>
            <p>
              You show up and tell me what kind of flow and elements you'd like
              incorporated into the tattoo, and I draw a design directly on the
              body with a marker, taking into account the construction of
              muscles, bones and nerves. It's a fun process as I try to
              understand and bring out the flow I see in a body.
            </p>
            <p>
              I always work with feedback and alter the design as needed. Once
              we're both happy, I start the tattooing process.
            </p>
          </details>
        </section>
      </main>
    </>
  );
};

export default Info;

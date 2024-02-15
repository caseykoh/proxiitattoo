import "./Info.css";

const Info = () => {
  return (
    <>
      <main className="info-page">
        <section className="info-section">
          <p className="info-text">
            Welcome to PROXII_WORLD, where all of proxii_dream's artifacts and
            storylines live. Here lives the creatures and stories stemming from
            my personal experiences, some of which are manifested into physical
            mediums like pencil on paper and ink on skin.
          </p>
          <p className="info-text">
            My tattoo style can be characterized as abstract blackwork designs
            that seamlessly blend with the body's natural architecture. Pulling
            textures and elements from organic forms, I create tattoos that
            reflect each person's individual style and story. My approach is
            grounded in collaboration and innovation, aiming to bring the
            internal rhythms of your body to the surface.
          </p>
        </section>
        <section className="tattoo-faq">
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
              I do flash, custom and freehand tattoos. I'm pretty flexible with
              my designs.
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

import { useEffect } from "react";
import "./Info.css";
import goToTop from "../GoToTop";

const faq = [
  {
    title: "Booking + Location",
    questions: [
      {
        q: "How do I book?",
        a: "Send me a dm on Instagram @proxii_dream. Please detail your design idea, placement and size. I will get back to you with my next availability. Feel free to send images of designs/works from my page.",
      },
      {
        q: "Where are you located?",
        a: "I work out of @000000000000_studio, a private studio near Bloor-Yonge.",
      },
    ],
  },
  {
    title: "Pricing + Deposits",
    questions: [
      {
        q: "How much do you charge?",
        a: "I charge a flat fee for every piece, which you may inquire during the consultation process. I take into account: placement, size and design - so please provide as much information as you can when inquiring.",
      },
      {
        q: "Do you take a deposit?",
        a: "A $50 CAD deposit is required to secure your appointment.",
      },
      {
        q: "Cancellation Policy?",
        a: "Deposits are non-refundable after 24 hours of booking. In the case that you need to cancel an appointment, please let me know as soon as possible.",
      },
    ],
  },
  {
    title: "Tattoo Styles + Custom Work",
    questions: [
      {
        q: "What kind of styles do you do?",
        a: "I specialize in black and grey abstract pieces that flow with your anatomy. I draw most of my designs on paper, giving it a raw and organic quality. My work is characterized by ethereal, dynamic textures that evoke notes of softness, expansion, and sound.",
      },
      {
        q: "Do you do custom tattoos?",
        a: "Yes, I do flash, custom and freehand tattoos. I can also modify flash for your idea.",
      },
      {
        q: "What are freehand tattoos?",
        a: "You show up and tell me what kind of flow and elements you'd like incorporated into the tattoo, and I draw a design directly on the body with a marker, taking into account the construction of muscles, bones and nerves. It's a fun process as I try to understand and bring out the flow I see in a body. I always work with feedback and alter the design as needed. Once we're both happy, I start the tattooing process.",
      },
    ],
  },
];

const Info = () => {
  useEffect(() => {
    goToTop();
  }, []);
  return (
    <>
      <main className="info-page w-full md:w-[40vw] pt-32 px-4">
        <section className="">
          {faq.map(({ title, questions }, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-xl mb-4">{title}</h2>
              <div className="questions">
                {questions.map(({ q, a }, qIndex) => (
                  <div key={qIndex} className="faq-item">
                    <p className="question text-black/50 mb-2">[ {q} ]</p>
                    <p className="answer mb-4">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Info;

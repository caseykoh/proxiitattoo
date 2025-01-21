import { useEffect } from "react";
import "./Info.css";
import goToTop from "../GoToTop";
import profilepic from "../../public/assets/proxiiprofile.jpeg";

const faq = [
  {
    title: "Booking + Location",
    questions: [
      {
        q: "How do I book?",
        a: "Send me an email at proxiidream@gmail.com. Please detail your design idea, placement and size. I will get back to you with my next availability and feel free to send images of designs/works from my page. Note: the appointment is only confirmed and booked once a deposit is sent.",
      },
      {
        q: "Where are you located?",
        a: "I work out of @000000000000_studio, a private studio near Bloor-Yonge. The address will be sent once a deposit is sent.",
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
        <section className="grid md:grid-cols-2">
          <div>⋆｡𖦹°⭒˚｡⋆</div>
          <div className="text-black/40 flex flex-col gap-3">
            <span>
              hi - im proxii, or proxii_dream on instagram. i've been tattooing
              for three years and i like to create hazy soundscapes that flow
              with the body
            </span>
            <img
              src={profilepic}
              alt="proxii"
              className="border-solid border border-black p-[1px]"
            />
            <span>
              i'm heavily inspired by music, atmospheric and bubbly, nature, the
              idea of light and absence and poetry.
            </span>
            <span>
              hope you enjoy your stay on this little site of mine that i custom
              coded & designed.
            </span>
            <span>
              {
                "thanks for your continued support and interest in my art <3 you make it all worthwhile"
              }
            </span>
          </div>
        </section>
        <div className="py-12 text-center text-black/20">
          <p className="">ฅ^._.^ฅ</p>
          <p className="text-2xl">FAQ</p>
        </div>
        <section className="">
          {faq.map(({ title, questions }, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl mb-5 font-mono">{title}</h2>
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

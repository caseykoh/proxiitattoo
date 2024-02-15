import { TypeAnimation } from "react-type-animation";
import "./Booking.css";
import { useMultiStepForm } from "../useMultiStepForm";
import { NameForm } from "../components/BookingForm/NameForm";
import { EmailForm } from "../components/BookingForm/EmailForm";
import { DescriptionForm } from "../components/BookingForm/DescriptionForm";
import { DateForm } from "../components/BookingForm/DateForm";
import { DesignTypeForm } from "../components/BookingForm/DesignTypeForm";
import { InstagramForm } from "../components/BookingForm/InstagramForm";
import { FormEvent, useState } from "react";
import { DummyForm } from "../components/BookingForm/DummyForm";

export enum DesignTypeEnum {
  flash = "flash",
  custom = "custom",
  freehand = "freehand",
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  instagram: string;
  designType: string;
  description: string;
  date: string;
  dummy: string;
};

const INITIALDATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  instagram: "",
  designType: "",
  description: "",
  date: "",
  dummy: "",
};

export default function Booking() {
  const [data, setData] = useState(INITIALDATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { currentStepIndex, step, steps, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <NameForm {...data} updateFields={updateFields} />,
      <EmailForm {...data} updateFields={updateFields} />,
      <InstagramForm {...data} updateFields={updateFields} />,
      <DesignTypeForm {...data} updateFields={updateFields} />,
      <DescriptionForm {...data} updateFields={updateFields} />,
      <DateForm {...data} updateFields={updateFields} />,
    ]);

  // pressing enter triggers this as well.
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(e);
    //this should only run when the callback has been finished
    if (!isLastStep) return next();
    alert;
  }

  return (
    <>
      <main className="booking-page">
        <section className="terminal-section">
          <form onSubmit={onSubmit}>
            <div>
              step: {currentStepIndex}/ {steps.length}
            </div>
            {step}
            <div className="prompt-button-container">
              {!isFirstStep && (
                <button className="nav-button" type="button" onClick={back}>
                  Back
                </button>
              )}
              <button className="nav-button" type="button" onClick={next}>
                {isLastStep ? "Finish" : "Next"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

{
  /* <section className="terminal-section">
          <TypeAnimation
            sequence={[
              "Hey, did you want to book an appointment with proxii_dream?", // Types 'One'
              1000, // Waits 1s
              "ok sick", // Types 'One'
              1000, // Waits 1s
              () => {
                console.log("Sequence completed");
              },
            ]}
            speed={40}
            wrapper="span"
            cursor={true}
            repeat={0}
            omitDeletionAnimation={true}
            style={{ fontSize: "2em", display: "inline-block" }}
          />
        </section> */
}
{
  /* <section className="form-section">
          <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label>First Name</label>
              <input {...(register("firstName"), { required: true })} />
            </div>
            <div className="form-control">
              <label>Last Name</label>
              <input {...(register("lastName"), { required: true })} />
            </div>
            <div className="form-control">
              <label>Email</label>
              <input {...(register("email"), { required: true })} />
            </div>
            <div className="form-control">
              <label>Instagram Handle</label>
              <input {...register("instagram")} />
            </div>
            <div className="form-control">
              <label>Design Type</label>
              <select {...(register("designType"), { required: true })}>
                <option value="flash"></option>
                <option value="custom"></option>
                <option value="freehand"></option>
              </select>
            </div>
            <div className="form-control">
              <label>Placement and design ideas</label>
              <input {...register("description", { required: true })} />
            </div>
            {errors.firstName && <span>This field is required</span>}

            <input type="submit" />
          </form>
        </section>
      </main>
    </>
  );
} */
}

import { ReactNode, useState } from "react";
import { TypeAnimation } from "react-type-animation";

type FormWrapperProps = {
  promptSequence: (string | number)[];
  onPrompt: () => void;
  activeInput: boolean;
  children: ReactNode;
};

const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

export function FormWrapper({
  promptSequence: promptSequence,
  onPrompt,
  activeInput,
  children,
}: FormWrapperProps) {
  return (
    <>
      <section className="terminal-section">
        <TypeAnimation
          cursor={false}
          className={CURSOR_CLASS_NAME}
          sequence={[
            (el) => el.classList.add(CURSOR_CLASS_NAME),
            ...promptSequence,
            // "ok sick", // Types 'One'
            // 1000, // Waits 1s
            (el) => el.classList.remove(CURSOR_CLASS_NAME),
            onPrompt,
          ]}
          speed={40}
          wrapper="span"
          repeat={0}
          // omitDeletionAnimation={true}
          // style={{ fontSize: "2em", display: "inline-block" }}
        />
        {activeInput && <div className="text-form">{children}</div>}
      </section>
    </>
  );
}

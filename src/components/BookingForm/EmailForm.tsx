import { useCallback, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type EmailData = {
  email: string;
};

type EmailFormProps = EmailData & {
  updateFields: (fields: Partial<EmailData>) => void;
};

const promptSequence = ["cool, cool", 1000, "and what's your email? >"];

export function EmailForm({ email, updateFields }: EmailFormProps) {
  const [activeInput, setActiveInput] = useState(false);
  const onPrompt = () => {
    setActiveInput(true);
  };
  const inputRef = useCallback((inputElement: any) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  return (
    <>
      <FormWrapper
        promptSequence={promptSequence}
        onPrompt={onPrompt}
        activeInput={activeInput}
      >
        {activeInput && (
          <input
            autoFocus
            required
            ref={inputRef}
            type="text"
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
          />
        )}
      </FormWrapper>
    </>
  );
}

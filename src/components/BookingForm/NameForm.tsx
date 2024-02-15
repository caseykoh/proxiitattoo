import { useCallback, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type NameData = {
  firstName: string;
  lastName: string;
};

type NameFormProps = NameData & {
  updateFields: (fields: Partial<NameData>) => void;
};

const promptSequence = [
  "ok first things first",
  1000,
  "what's your first name? >",
];

export function NameForm({ firstName, lastName, updateFields }: NameFormProps) {
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
          <>
            <input
              autoFocus
              ref={inputRef}
              required
              type="text"
              value={firstName}
              onChange={(e) => updateFields({ firstName: e.target.value })}
            />
            {/* <span className="input-caret"></span> */}
          </>
        )}
      </FormWrapper>
    </>
  );
}

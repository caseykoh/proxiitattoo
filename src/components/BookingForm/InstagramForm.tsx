import { useCallback, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type InstagramData = {
  instagram: string;
};

type InstagramFormProps = InstagramData & {
  updateFields: (fields: Partial<InstagramData>) => void;
};

const promptSequence = [
  "thanks :)",
  1000,
  "i prefer to message on instagram",
  1000,
  "what's your @? >",
];

export function InstagramForm({ instagram, updateFields }: InstagramFormProps) {
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
        activeInput={activeInput}
        onPrompt={onPrompt}
      >
        {activeInput && (
          <input
            autoFocus
            required
            ref={inputRef}
            type="text"
            value={instagram}
            onChange={(e) => updateFields({ instagram: e.target.value })}
          />
        )}
      </FormWrapper>
    </>
  );
}

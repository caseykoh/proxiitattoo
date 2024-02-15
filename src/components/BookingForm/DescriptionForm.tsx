import { useCallback, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type DescriptionData = {
  description: string;
};

type DescriptionFormProps = DescriptionData & {
  updateFields: (fields: Partial<DescriptionData>) => void;
};

const promptSequence = [
  "sweet",
  1000,
  "and what kind of placement and style were you thinking of? >",
];

export function DescriptionForm({
  description,
  updateFields,
}: DescriptionFormProps) {
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
      <FormWrapper promptSequence={promptSequence} onPrompt={onPrompt}>
        {activeInput && (
          <input
            autoFocus
            required
            ref={inputRef}
            type="text"
            value={description}
            onChange={(e) => updateFields({ description: e.target.value })}
          />
        )}
      </FormWrapper>
    </>
  );
}

import { useCallback, useState } from "react";
import { FormWrapper } from "./FormWrapper";

type DateData = {
  date: string;
};

type DateFormProps = DateData & {
  updateFields: (fields: Partial<DateData>) => void;
};

const availableDates = new Date().toDateString();

const promptSequence = [
  "sick",
  1000,
  "i have availability " + availableDates,
  1000,
  "and i usually start at 2pm",
  1000,
  "which date works for you? >",
];

export function DateForm({ date, updateFields }: DateFormProps) {
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
            value={date}
            onChange={(e) => updateFields({ date: e.target.value })}
          />
        )}
      </FormWrapper>
    </>
  );
}

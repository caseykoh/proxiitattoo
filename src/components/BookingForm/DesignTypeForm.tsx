import { useCallback, useState } from "react";
import { FormWrapper } from "./FormWrapper";

enum DesignTypeEnum {
  flash = "flash",
  custom = "custom",
  freehand = "freehand",
}

type DesignTypeData = {
  designType: string;
};

type DesignTypeFormProps = DesignTypeData & {
  updateFields: (fields: Partial<DesignTypeData>) => void;
};

const promptSequence = [
  "ok",
  1000,
  "and did you want a custom, flash or freehand tattoo? >",
];

export function DesignTypeForm({
  designType,
  updateFields,
}: DesignTypeFormProps) {
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
        <label htmlFor={DesignTypeEnum.custom}>
          <input
            type="radio"
            name="designType"
            id={DesignTypeEnum.custom}
            value={designType}
            onChange={(e) =>
              updateFields({
                designType:
                  DesignTypeEnum[e.target.value as keyof typeof DesignTypeEnum],
              })
            }
          />
          Custom
        </label>

        <label htmlFor={DesignTypeEnum.flash}>
          <input
            type="radio"
            name="designType"
            id={DesignTypeEnum.flash}
            value={designType}
            onChange={(e) =>
              updateFields({
                designType:
                  DesignTypeEnum[e.target.value as keyof typeof DesignTypeEnum],
              })
            }
          />
          Flash
        </label>

        <label htmlFor={DesignTypeEnum.freehand}>
          <input
            type="radio"
            name="designType"
            id={DesignTypeEnum.freehand}
            value={designType}
            onChange={(e) =>
              updateFields({
                designType:
                  DesignTypeEnum[e.target.value as keyof typeof DesignTypeEnum],
              })
            }
          />
          Freehand
        </label>
      </FormWrapper>
    </>
  );
}

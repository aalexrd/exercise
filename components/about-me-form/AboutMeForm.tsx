import { DynamicFormComponent } from "@/types";
import { TextField } from "@mui/material";
import { ChangeEventHandler, useCallback, useState } from "react";

const DATA_NAME = "about";

export const AboutMeForm: DynamicFormComponent = ({ onChange }) => {
  const [value, setValue] = useState("");
  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { name, value: newValue } }) => {
      setValue(newValue);

      onChange({
        name,
        value: newValue,
      });
    },
    [onChange]
  );

  return (
    <TextField
      name={DATA_NAME}
      label="About Me"
      value={value}
      onChange={handleChange}
    />
  );
};

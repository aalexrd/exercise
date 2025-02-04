import { DynamicFormComponent } from "@/types";
import { TextField } from "@mui/material";
import { ChangeEventHandler, useCallback, useState } from "react";

const ADDRESS_FIELDS = [
  { name: "street", label: "Street Address" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "zip", label: "Zip" },
];

export const AddressForm: DynamicFormComponent = ({ onChange }) => {
  const [state, setState] = useState<Record<string, string>>({});
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { name, value: newValue } }) => {
      setState((s) => ({
        ...s,
        [name]: newValue,
      }));

      onChange({
        name,
        value: newValue,
      });
    },
    [onChange]
  );

  return ADDRESS_FIELDS.map((field) => (
    <TextField
      key={field.name}
      name={field.name}
      label={field.label}
      value={state[field.name] || ""}
      onChange={handleChange}
    />
  ));
};

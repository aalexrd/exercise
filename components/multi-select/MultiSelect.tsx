import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useCallback } from "react";

type NameLabel = {
  name: string;
  label: string;
};

type MultiSelectProps = {
  fields: NameLabel[];
  options: NameLabel[];
  value: Record<string, string[]>;
  onChange: (value: Record<string, string[]>) => void;
};

export const MultiSelect: FC<MultiSelectProps> = ({
  fields,
  options,
  value,
  onChange,
}) => {
  const handleChange = useCallback(
    ({ target: { name, value: newValue } }: SelectChangeEvent<string[]>) => {
      const values = newValue as string[];

      // Prevent unselecting all options in the current field
      if (values.length === 0) {
        return;
      }

      const updatedValue = { ...value, [name]: values };

      // Check if any selected option exists in another field and remove it
      Object.keys(value).forEach((otherField) => {
        if (otherField !== name) {
          updatedValue[otherField] = updatedValue[otherField].filter(
            (option) => !values.includes(option)
          );
        }
      });

      // Ensure that at least one option is selected in each field
      for (const fieldName of Object.keys(updatedValue)) {
        if (updatedValue[fieldName].length === 0) {
          return;
        }
      }

      onChange(updatedValue);
    },
    [onChange, value]
  );

  return fields.map((field) => (
    <FormControl key={field.name}>
      <InputLabel id={`${field.name}_label`}>{field.label}</InputLabel>
      <Select
        multiple
        labelId={`${field.name}_label`}
        name={field.name}
        value={value[field.name]}
        input={<OutlinedInput label="Name" />}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ));
};

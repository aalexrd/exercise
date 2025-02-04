import { DynamicFormComponent } from "@/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";

const DATA_NAME = "birthdate";

export const BirthdateForm: DynamicFormComponent = ({ onChange }) => {
  const [value, setValue] = useState<Dayjs | null>();
  // Don't allow future dates
  const maxDate = useMemo(() => dayjs(), []);

  const handleChange = useCallback(
    (newValue: Dayjs | null) => {
      setValue(newValue);

      onChange({
        name: DATA_NAME,
        value: newValue?.toJSON() || '', // TODO: send as UTC
      });
    },
    [onChange]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Birthdate"
        name={DATA_NAME}
        maxDate={maxDate}
        value={value}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

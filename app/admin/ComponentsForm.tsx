"use client";

import { MultiSelect } from "@/components/multi-select/MultiSelect";
import { DynamicFormComponents, StepComponent } from "@/types";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useCallback, useMemo, useState } from "react";

type ComponentsFormProps = {
  components: StepComponent[];
};

export const ComponentsForm: FC<ComponentsFormProps> = ({ components }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Record<string, string[]>>();

  const { enqueueSnackbar } = useSnackbar();

  const initialState = useMemo(
    () =>
      components
        .map((m) => ({ [`${m.step_number}`]: m.components }))
        .reduce((acc, step) => ({ ...acc, ...step }), {}),
    [components]
  );

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await fetch(`/api/components`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      enqueueSnackbar("Saved successfully!");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, state]);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
      <MultiSelect
        fields={[
          { name: "2", label: "Step 2" },
          { name: "3", label: "Step 3" },
        ]}
        options={[
          { name: DynamicFormComponents.ABOUT_ME, label: "About Me" },
          { name: DynamicFormComponents.ADDRESS, label: "Address" },
          { name: DynamicFormComponents.BIRTHDATE, label: "Birthdate" },
        ]}
        onChange={setState}
        value={state || initialState}
      />
      <Button loading={loading} disabled={loading} onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
};

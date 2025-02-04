"use client";

import { AboutMeForm } from "@/components/about-me-form/AboutMeForm";
import { AddressForm } from "@/components/address-form/AddressForm";
import { BirthdateForm } from "@/components/birthdate-form/BirthdateForm";
import {
  ChangedData,
  DynamicFormComponent,
  DynamicFormComponents,
} from "@/types";
import { Box, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { FC, useCallback, useState } from "react";

const COMPONENTS: Record<DynamicFormComponents, DynamicFormComponent> = {
  ADDRESS: AddressForm,
  BIRTHDATE: BirthdateForm,
  ABOUT_ME: AboutMeForm,
};

type OnboardingProps = {
  components: DynamicFormComponents[];
  email: string;
};

const OnboardingForm: FC<OnboardingProps> = ({ components, email }) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = useCallback(
    ({ name, value }: ChangedData) =>
      setState((v) => ({ ...v, [name]: value })),
    []
  );

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/users/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const data = await response.json();
        enqueueSnackbar(data.error, { variant: "error" });
        setLoading(false);
        return;
      }

      router.push(response.url);
    } catch (error) {
      // Log the error
      console.error(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
      setLoading(false);
    }
  }, [email, enqueueSnackbar, router, state]);

  if (!components?.length) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      {components?.map((name) => {
        const Component = COMPONENTS[name];
        return <Component key={name} onChange={handleChange} />;
      })}
      <Divider sx={{ width: 100 }} />
      <Button loading={loading} disabled={loading} onClick={handleSubmit}>
        Next
      </Button>
    </Box>
  );
};

export default OnboardingForm;

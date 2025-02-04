"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

export const Header: FC = () => {
  const { step } = useParams();

  return (
    <Box padding={2}>
      <Typography variant="h4">Onboarding</Typography>
      <Typography variant="caption">Step {step || "1"} / 3</Typography>
    </Box>
  );
};

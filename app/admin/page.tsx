import { FC } from "react";
import { ComponentsForm } from "./ComponentsForm";
import { Container, Typography } from "@mui/material";
import { StepComponent } from "@/types";

const Admin: FC = async () => {
  const data: StepComponent[] = await fetch(
    `${process.env.URL}/api/components`,
    { cache: "no-store" }
  ).then((r) => r.json());

  return (
    <Container component="main">
      <Typography variant="h3" gutterBottom>
        Admin
      </Typography>
      <ComponentsForm components={data} />
    </Container>
  );
};

export default Admin;

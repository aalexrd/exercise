import { FC } from "react";
import UsersTable from "./UsersTable";
import { Container } from "@mui/material";

const Data: FC = () => {
  return (
    <Container component="main">
      <UsersTable />
    </Container>
  );
};

export default Data;

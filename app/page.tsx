import { Header } from "@/components/header/Header";
import { LogInForm } from "./LogInForm";
import { Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Container component="main">
      <Header />
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        <LogInForm />
      </Box>
    </Container>
  );
};

export default Home;

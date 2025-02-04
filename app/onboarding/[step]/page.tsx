import { Header } from "@/components/header/Header";
import { FC } from "react";
import OnboardingForm from "./OnboardingForm";
import { Container } from "@mui/material";
import { cookies } from "next/headers";

type OnboardingProps = {
  params: Promise<{ step: string }>;
};

const Onboarding: FC<OnboardingProps> = async ({ params }) => {
  const { step } = await params;
  const cookiesStore = await cookies();
  const email = cookiesStore.get("email");
  const data = await fetch(`${process.env.URL}/api/components/${step}`).then(
    (r) => r.json()
  );

  return (
    <Container component="main">
      <Header />
      <OnboardingForm components={data} email={email!.value} />
    </Container>
  );
};

export default Onboarding;

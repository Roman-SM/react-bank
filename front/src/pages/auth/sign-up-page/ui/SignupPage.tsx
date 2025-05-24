import { Page, Title, BackButton, StatusBar, HomeIndicator } from "@shared/ui";
import SignUpForm from "./SignupForm";
import { useEffect } from "react";

export default function SignupPage() {
  useEffect(() => {
    document.title = "Signup Page";
  }, []);
  return (
    <Page>
      <StatusBar />
      <BackButton />
      <Title title="Signup" description="Choose a registration method" />
      <SignUpForm />
      <HomeIndicator />
    </Page>
  );
}

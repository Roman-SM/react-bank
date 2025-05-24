import { Page, Title, BackButton, StatusBar, HomeIndicator } from "@shared/ui";
import { SignInForm } from "./SigninForm";
import { useEffect, useState } from "react";
import SuccessWindow from "@shared/ui/success/SuccessWindow";

export default function SigninPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    document.title = "Signin Page";
  }, []);

  return (
    <Page>
      <StatusBar />
      <BackButton />
      <Title title="Sign in" description="Choose a registration method" />
      <SignInForm modalOpen={setModalOpen} />
      {isModalOpen ? (
        <SuccessWindow
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      ) : (
        ""
      )}
      <HomeIndicator />
    </Page>
  );
}

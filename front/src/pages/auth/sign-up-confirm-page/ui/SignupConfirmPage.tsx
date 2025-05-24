import { Page, Title, BackButton, StatusBar, HomeIndicator } from "@shared/ui";
import { SignUpConfirmForm } from "./SignupConfirmForm";
import { useEffect, useState } from "react";
import SuccessWindow from "@shared/ui/success/SuccessWindow";

export default function SignupConfirmPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    document.title = "Signup Confirm Page";
  }, []);

  return (
    <Page>
      <StatusBar />
      <BackButton />
      <Title
        title="Signup Confirm"
        description="Choose a registration method"
      />
      <SignUpConfirmForm modalOpen={setModalOpen} />
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

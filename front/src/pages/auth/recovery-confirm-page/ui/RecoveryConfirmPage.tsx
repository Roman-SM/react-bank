import { useEffect, useState } from "react";
import { RecoveryConfirmForm } from "./RecoveryConfirmForm";
import { Page, Title, BackButton, StatusBar, HomeIndicator } from "@shared/ui";
import SuccessWindow from "@shared/ui/success/SuccessWindow";

export default function RecoveryConfirmPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Recovery Confirm Page";
  }, []);
  return (
    <Page>
      <StatusBar />
      <BackButton />
      <Title
        title="Recovery password"
        description="Write the code you received"
      />
      <RecoveryConfirmForm modalOpen={setModalOpen} />
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

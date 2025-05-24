import { Page, BackButton, StatusBar } from "@shared/ui";
import SendForm from "./SendForm";
import { useEffect, useState } from "react";
import SuccessWindow from "@shared/ui/success/SuccessWindow";

export default function SendPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Send Page";
  }, []);
  return (
    <Page variant="gray">
      <StatusBar />
      <BackButton title="Send" retreat="retreat" backBalance={true} />
      <SendForm modalOpen={setModalOpen} />
      {isModalOpen ? (
        <SuccessWindow
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      ) : (
        ""
      )}
    </Page>
  );
}

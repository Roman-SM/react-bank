import { Page, BackButton, StatusBar } from "@shared/ui";
import PaymentForm from "./PaymentForm";
import { useEffect, useState } from "react";
import SuccessWindow from "@shared/ui/success/SuccessWindow";

export default function ReceivePage() {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Receive Page";
  }, []);

  return (
    <Page variant="gray">
      <StatusBar />
      <BackButton title="Receive" retreat="retreat" backBalance={true} />
      <PaymentForm modalOpen={setModalOpen} />
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

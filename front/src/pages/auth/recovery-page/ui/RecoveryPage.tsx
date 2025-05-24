import { useEffect } from "react";
import { RecoveryForm } from "./RecoveryForm.tsx";
import { BackButton, HomeIndicator, Page, StatusBar, Title } from "@shared/ui";

export default function RecoveryPage() {
  useEffect(() => {
    document.title = "Recovery Page";
  }, []);
  return (
    <Page>
      <StatusBar />
      <BackButton />
      <Title title="Recovery password" description="Choose a recovery method" />
      <RecoveryForm />
      <HomeIndicator />
    </Page>
  );
}

import "./SettingsPageStyle.css";
import { Page, BackButton, StatusBar, Button, Divider } from "@shared/ui";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateEmailForm from "./UpdateEmailForm";
import { useEffect, useState } from "react";
import { useAuth } from "@shared/lib";
import SuccessWindow from "@shared/ui/success/SuccessWindow";

export default function SettingsPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    document.title = "Settings Page";
  }, []);

  const { dispatches } = useAuth();
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatches({ type: "LOGOUT" });
  };

  return (
    <Page>
      <StatusBar />
      <BackButton title="Settings" retreat="retreat" backBalance={true} />
      <UpdateEmailForm modalOpen={setModalOpen} />
      <Divider variant="big" />
      <UpdatePasswordForm modalOpen={setModalOpen} />
      <Divider variant="big" />
      <Button variant="outline-red" text="Log out" onClick={handleLogout} />
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

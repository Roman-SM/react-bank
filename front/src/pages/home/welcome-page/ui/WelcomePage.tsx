import "./WelcomePageStyle.css";
import { ReactComponent as SafeImageWelcomePage } from "./assets/safe-welcome-page.svg";
import { StatusBar, Page, Title, HomeIndicator } from "@shared/ui";
import { Buttons } from "./ButtonsWelcomePage";
import { useEffect } from "react";

export default function WelcomePage() {
  useEffect(() => {
    document.title = "Welcome Page";
  }, []);
  return (
    <Page variant="image">
      <StatusBar img="statusBarWhite" />
      <div className="welcome-page-container">
        <SafeImageWelcomePage className="welcome-page-safe-image" />
        <Title
          variantContainer="welcome-page-container"
          variantText="welcome-page-text"
          variantDescr="welcome-page-description"
          title="Hello!"
          description="Welcome to bank app"
        />
        <Buttons />
      </div>
      <HomeIndicator />
    </Page>
  );
}

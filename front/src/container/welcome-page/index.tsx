import "./index.css";
import Title from "../../component/title";
import Button from "../../component/button";
import Page from "../../component/page";
import BackgroundImage from "./background-image.svg";
import StatusBar from "../../component/status-bar";
import Safe from "./safe.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const data = {
  title: {
    name: "Hello!",
    description: "Welcome to bank app",
  },
  button: {
    signup: "Sign Up",
    signin: "Sign In",
    type: "button",
  },
} as const;

const Buttons = () => {
  return (
    <div className="welcome-page-buttons">
      <Link to="/signup" className="welcome-page-buttons-link">
        <Button variant="filled" text={data.button.signup} />
      </Link>
      <Link to="/signin" className="welcome-page-buttons-link">
        <Button text={data.button.signin} />
      </Link>
    </div>
  );
};

const WelcomePage = () => {
  useEffect(() => {
    document.title = "Welcome Page";
  }, []);

  return (
    <div className="welcome-page-container">
      <img
        src={BackgroundImage}
        alt="Background img"
        className="welcome-page-background-image"
      />
      <img src={Safe} alt="Safe" className="welcome-page-safe-image" />
      <Title
        variantContainer="welcome-page-container"
        variantText="welcome-page-text"
        variantDescr="welcome-page-description"
        title={data.title.name}
        description={data.title.description}
      />
      <Buttons />
    </div>
  );
};

export default function Component() {
  return (
    <Page variant="white">
      <StatusBar img="statusBarWhite" />
      <WelcomePage />
    </Page>
  );
}

import "./WelcomePageStyle.css";
import { Link } from "react-router-dom";
import { Button } from "@shared/ui/button/Button";

export const Buttons = () => {
  return (
    <div className="welcome-page-buttons">
      <Link to="/signup" className="welcome-page-buttons-link">
        <Button variant="filled" text="Sign Up" />
      </Link>
      <Link to="/signin" className="welcome-page-buttons-link">
        <Button text="Sign In" />
      </Link>
    </div>
  );
};

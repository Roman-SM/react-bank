import "./index.css";
import backButton from "./back-button.svg";
import { Link } from "react-router-dom";

type BackButtonProps = {
  title?: string;
  retreat?: "retreat";
};

export default function Component({ title, retreat }: BackButtonProps) {
  return (
    <div className={`back-button-container back-button ${retreat}`}>
      <Link to="/balance">
        <img src={backButton} alt="<" className="back-button-img" />
      </Link>
      <h1 className="back-button-title">{title}</h1>
    </div>
  );
}

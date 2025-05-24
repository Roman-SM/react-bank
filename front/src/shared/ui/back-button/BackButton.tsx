import "./BackButtonStyle.css";
import { ReactComponent as BackButtonIcon } from "../icons/back-button.svg";
import { Link, useNavigate } from "react-router-dom";
import { BackButtonProps } from "@shared/types";

export function BackButton({ title, retreat, backBalance }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <div className={`back-button-container back-button ${retreat}`}>
      {backBalance ? (
        <Link to="/balance">
          <BackButtonIcon className="back-button-img animation-back-button" />
        </Link>
      ) : (
        <button
          type="button"
          className="back-button-img animation-back-button"
          onClick={() => navigate(-1)}
          aria-label="Назад"
        >
          <BackButtonIcon />
        </button>
      )}
      <h1 className="back-button-title">{title}</h1>
    </div>
  );
}

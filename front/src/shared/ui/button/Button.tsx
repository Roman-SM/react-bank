import "./ButtonStyle.css";
import { ButtonProps } from "@shared/types";

export function Button({
  text,
  variant = "outline",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`button-container ${
        disabled ? "btn-disabled" : `btn ${variant}`
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

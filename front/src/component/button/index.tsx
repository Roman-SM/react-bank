import "./index.css";

type ButtonProps = {
  text: string;
  variant?: "filled" | "outline" | "outline-red";
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
};

export default function Component({
  text,
  variant = "outline",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`button-container button-text btn ${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

import "./index.css";
import { useState } from "react";

interface InputProps {
  text?: string;
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  error?: string;
}

export default function Component({
  onChange,
  text = "Password",
  value,
  name,
  error,
}: InputProps) {
  const [typePassword, setPassword] = useState(false);
  function handleClick() {
    setPassword(!typePassword);
  }

  return (
    <div className="field-password">
      <label
        htmlFor={name}
        className={
          error
            ? "field-password-label-error field-password-label"
            : "field-password-label"
        }
      >
        {text}
      </label>
      <input
        type={typePassword ? "text" : "password"}
        className={
          error
            ? "field-password-input-error field-password-input"
            : "field-password-input"
        }
        name={name}
        id={name}
        placeholder="Enter password"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      <span
        onClick={handleClick}
        className={
          typePassword ? "field-password-icon-hide" : "field-password-icon-show"
        }
      ></span>
      {error && <p className="field-password-text-error">{error}</p>}
    </div>
  );
}

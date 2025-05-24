import "@shared/ui/styles/field-style.css";
import { useState } from "react";
import { InputPropsPassword } from "@shared/types";

export function FieldPassword({
  onChange,
  text = "Password",
  value,
  name,
  error,
}: InputPropsPassword) {
  const [typePassword, setPassword] = useState(false);
  function handleClick() {
    setPassword(!typePassword);
  }

  return (
    <div className="field-container field-password">
      <label
        htmlFor={name}
        className={error ? "field-label-error field-label" : "field-label"}
      >
        {text}
      </label>
      <input
        type={typePassword ? "text" : "password"}
        className={error ? "field-input-error field-input" : "field-input"}
        name={name}
        id={name}
        placeholder="Enter password"
        value={value}
        onChange={(e) => onChange(name ?? "", e.target.value)}
      />
      <span
        onClick={handleClick}
        className={
          typePassword ? "field-password-icon-hide" : "field-password-icon-show"
        }
      ></span>
      {error && <p className="field-text-error">{error}</p>}
    </div>
  );
}

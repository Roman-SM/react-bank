import "@shared/ui/styles/field-style.css";
import { InputPropsCode } from "@shared/types";

export function FieldCode({
  text,
  name,
  variant = "",
  placeholder,
  value,
  onChange,
  error,
}: InputPropsCode) {
  return (
    <div className="field-container">
      <label
        htmlFor={name}
        className={error ? "field-label field-label-error" : "field-label"}
      >
        {text}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        className={
          error
            ? "field-input-error field-input"
            : `field-input field-background ${variant}`
        }
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {error && <p className="field-text-error">{error}</p>}
    </div>
  );
}

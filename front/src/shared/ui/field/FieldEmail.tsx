import "@shared/ui/styles/field-style.css";
import { InputPropsEmail } from "@shared/types";

export function FieldEmail({
  onChange,
  variant = "",
  value,
  name,
  error,
}: InputPropsEmail) {
  return (
    <div className="field-container">
      <label
        htmlFor={name}
        className={error ? "field-label field-label-error" : "field-label"}
      >
        Email
      </label>
      <input
        type="email"
        name={name}
        id={name}
        className={
          error
            ? "field-input-error field-input"
            : `field-input field-background ${variant}`
        }
        placeholder="Enter email"
        value={value}
        onChange={(e) => onChange(name || "", e.target.value)}
      />
      {error && <p className="field-text-error">{error}</p>}
    </div>
  );
}

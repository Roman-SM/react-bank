import "./index.css";

interface InputProps {
  onChange: (name: string, value: string) => void;
  variant?: string;
  value: string;
  name: string;
  error?: string;
}

export default function Component({
  onChange,
  variant = "",
  value,
  name,
  error,
}: InputProps) {
  return (
    <div className="field-email-container">
      <label
        htmlFor={name}
        className={
          error
            ? "field-email-label field-email-label-error"
            : "field-email-label"
        }
      >
        Email
      </label>
      <input
        type="email"
        name={name}
        id={name}
        className={
          error
            ? "field-email-input-error field-email-input"
            : `field-email-input field-email-background ${variant}`
        }
        placeholder="Enter email"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {error && <p className="field-email-text-error">{error}</p>}
    </div>
  );
}

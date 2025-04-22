import "./index.css";

interface InputProps {
  text?: string;
  value?: string;
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
        type="password"
        className={
          error
            ? "field-password-input-error field-password-input"
            : "field-password-input"
        }
        name={name}
        placeholder="Enter password"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
      {error && <p className="field-password-text-error">{error}</p>}
    </div>
  );
}

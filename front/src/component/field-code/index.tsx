import "./index.css";

interface InputProps {
  text: string;
  name: string;
  value: string;
  variant?: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

export default function Component({
  text,
  name,
  variant = "",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="field-code">
      <label htmlFor={name} className="field-code-label">
        {text}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        className={`field-code-input field-code-background ${variant}`}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
}

import "./FormStyle.css";

export function Form({ children }: { children: React.ReactNode }) {
  return <form className="form-container">{children}</form>;
}

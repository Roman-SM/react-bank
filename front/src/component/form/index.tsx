import "./index.css";

export default function Form({ children }: { children: React.ReactNode }) {
  return <form className="form-container">{children}</form>;
}

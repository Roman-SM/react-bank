import "./index.css";
import backButton from "./back-button.svg";

class goBack {
  static back() {
    return window.history.back();
  }
}
type BackButtonProps = {
  title?: string;
  retreat?: "retreat";
};

export default function Component({ title, retreat }: BackButtonProps) {
  return (
    <div className={`back-button-container back-button ${retreat}`}>
      <img
        onClick={() => goBack.back()}
        src={backButton}
        alt="<"
        className="back-button-img"
      />
      <h1 className="back-button-title">{title}</h1>
    </div>
  );
}

import "./StatusBarStyle.css";
import statusBarWhite from "./status-bar-white.svg";
import statusBarBlack from "./status-bar-black.svg";

export function StatusBar({ img }: { img?: "statusBarWhite" }) {
  return (
    <div className="status-bar-container">
      <img
        src={img === "statusBarWhite" ? statusBarWhite : statusBarBlack}
        alt="Status bar"
        className="status-bar-img"
      />
    </div>
  );
}

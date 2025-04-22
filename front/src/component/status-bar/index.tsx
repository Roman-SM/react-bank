import "./index.css";
import statusBarWhite from "./status-bar-white.svg";
import statusBarBlack from "./status-bar-black.svg";

type StatusBarProps = {
  img: "statusBarWhite" | "statusBarBlack";
};

export default function Component({ img }: StatusBarProps) {
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

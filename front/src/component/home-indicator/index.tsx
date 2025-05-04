import "./index.css";
import homeIndicator from "./home-indicator.svg";

export default function Component() {
  return (
    <div className="home-indicator-container">
      <img src={homeIndicator} alt="Home indicator" />
    </div>
  );
}

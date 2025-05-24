import "./HomeIndicatorStyle.css";
import homeIndicator from "../icons/home-indicator.svg";

export function HomeIndicator() {
  return (
    <div className="home-indicator-container">
      <img src={homeIndicator} alt="Home indicator" />
    </div>
  );
}

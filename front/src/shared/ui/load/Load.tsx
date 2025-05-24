import "./LoadStyle.css";
import alertImg from "./alert.svg";

export const LOAD_STATUS = {
  PROGRESS: "progress",
  SUCCESS: "success",
  ERROR: "error",
};

export function Alert({ message, status = "default" }: any) {
  return (
    <div className={`alert alert--${status}`}>
      {status === LOAD_STATUS.ERROR && <img src={alertImg} alt="Alert" />}
      {message}
    </div>
  );
}
export function Skeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
    </div>
  );
}

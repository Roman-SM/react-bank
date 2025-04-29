import "./index.css";
import announcement from "./announcement.svg";
import warning from "./warning.svg";

type NotificationList = {
  date: string;
  type: string;
  text: string;
};

const icons: Record<string, string> = {
  Announcement: announcement,
  Warning: warning,
};

export default function Component({ date, type, text }: NotificationList) {
  return (
    <div className="notification-list-container">
      <div className="notification-list-left">
        <img src={icons[type]} alt={type} />
        <div className="notification-list-info">
          <span className="notification-list-title">{text}</span>
          <div className="notification-list-descr">
            <span className="notification-list-date">{date}</span>
            <span>{type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

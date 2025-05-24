import "./NotificationStyle.css";
import { ReactComponent as AnnouncementNotifications } from "./assets/notification-announcement.svg";
import { ReactComponent as WarningNotifications } from "./assets/notification-warning.svg";
import { NotificationList } from "@shared/types";

const icons: Record<string, React.ReactNode> = {
  Announcement: <AnnouncementNotifications />,
  Warning: <WarningNotifications />,
};

export default function Notification({ date, type, text }: NotificationList) {
  return (
    <div className="notification-list-container">
      <div className="notification-list-left">
        {icons[type]}
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

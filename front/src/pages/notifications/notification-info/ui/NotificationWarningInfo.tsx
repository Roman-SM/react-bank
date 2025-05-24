import "./NotificationInfoStyle.css";
import { Divider } from "@shared/ui/divider/Divider";
import { NotificationWarningType } from "@shared/types/types";

export default function NotificationWarningInfo({
  date,
  email,
  text,
  status,
  type,
}: NotificationWarningType) {
  return (
    <div className="notification-container">
      <span className="notification-title">{text}</span>
      <div className="notification-container-info">
        <div className="notification-item">
          <span className="notification-item-info">Date</span>
          <span className="notification-item-info">{date}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">User</span>
          <span className="notification-item-info">{email}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Type notification</span>
          <span className="notification-item-info">{type}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Status</span>
          <span className="notification-item-info">{status}</span>
        </div>
      </div>
    </div>
  );
}

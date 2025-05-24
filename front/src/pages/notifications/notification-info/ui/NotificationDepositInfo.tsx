import "./NotificationInfoStyle.css";
import { Divider } from "@shared/ui/divider/Divider";
import { NotificationDepositType } from "@shared/types";

export default function NotificationDepositInfo({
  text,
  date,
  email,
  sum,
  typeNotification,
  status,
}: NotificationDepositType) {
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
          <span className="notification-item-info">Recipient Email</span>
          <span className="notification-item-info">{email}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Sum deposit</span>
          <span className="notifications-sum-deposit">{sum}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Type notification</span>
          <span className="notification-item-info">{typeNotification}</span>
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

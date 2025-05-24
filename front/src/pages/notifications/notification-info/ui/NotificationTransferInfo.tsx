import "./NotificationInfoStyle.css";
import { Divider } from "@shared/ui/divider/Divider";
import { NotificationTransferType } from "@shared/types/types";

export default function NotificationTransferInfo({
  date,
  emailSender,
  emailRecipient,
  typeNotification,
  text,
  sum,
  status,
  typeTransfer,
}: NotificationTransferType) {
  return (
    <div className="notification-container">
      <span className="notification-title">{text}</span>
      <div className="notification-container-info">
        <div className="notification-item">
          <span className="notification-item-info">Type</span>
          <span className="notification-item-info">{date}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Sender Email</span>
          <span className="notification-item-info">{emailSender}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Recipient Email</span>
          <span className="notification-item-info">{emailRecipient}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Type transfer</span>
          <span className="notification-item-info">{typeTransfer}</span>
        </div>
        <Divider variant="small" />
        <div className="notification-item">
          <span className="notification-item-info">Sum transfer</span>
          <span className={`notifications-sum-${typeTransfer}`}>{sum}</span>
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

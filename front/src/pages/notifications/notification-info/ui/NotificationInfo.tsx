import NotificationDepositInfo from "./NotificationDepositInfo";
import NotificationWarningInfo from "./NotificationWarningInfo";
import NotificationTransferInfo from "./NotificationTransferInfo";

export default function NotificationInfo({ ...notification }: any) {
  console.log(notification);
  console.log(2);
  switch (notification.typeNotification) {
    case "Deposit":
      return <NotificationDepositInfo {...notification} />;
    case "Transfer":
      return <NotificationTransferInfo {...notification} />;
    case "Warning":
      return <NotificationWarningInfo {...notification} />;
    default:
      return null;
  }
}

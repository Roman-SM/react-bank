import { Page, BackButton, StatusBar, Alert } from "@shared/ui";
import { Fragment, useEffect } from "react";
import { Skeleton } from "@shared/ui/load/Load";
import { REQUEST_ACTION_TYPE } from "@shared/config/request";
import { useNotificationInfo } from "../api/getNotification";
import NotificationInfo from "@pages/notifications/notification-info/ui/NotificationInfo";

export default function NotificationInfoPage() {
  const state = useNotificationInfo();
  useEffect(() => {
    document.title = "Notification";
  }, []);
  console.log(state.data);
  console.log(1);
  return (
    <Page variant="gray">
      <StatusBar />
      <BackButton title="Transaction" retreat="retreat" />
      {state.status === REQUEST_ACTION_TYPE.PROGRESS && <Skeleton />}
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
      {state.status === REQUEST_ACTION_TYPE.SUCCESS &&
        state.data.list.map((item: any) => (
          <Fragment key={item.id}>
            <NotificationInfo {...item} />
          </Fragment>
        ))}
    </Page>
  );
}

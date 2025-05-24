import "./NotificationsStyle.css";
import Notification from "@pages/notifications/notification/ui/Notification";
import { Alert, Skeleton, BackButton, StatusBar, Page } from "@shared/ui";
import { Fragment, useEffect } from "react";
import { REQUEST_ACTION_TYPE } from "@shared/config/request";
import { useNotifications } from "../api/getNotifications";
import { Link } from "react-router-dom";

export default function NotificationsPage() {
  useEffect(() => {
    document.title = "Notifications Page";
  }, []);
  const { state } = useNotifications();
  return (
    <Page variant="gray">
      <StatusBar />
      <BackButton title="Notifications" retreat="retreat" backBalance={true} />
      {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
        <Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Fragment>
      )}
      {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
        <div className="notifications-list-scroll">
          {state.data.isEmpty ? (
            <Alert message="Список сповіщень пустий" />
          ) : (
            state.data.list.map((item: any) => (
              <Link
                to={`/notification/${item.id}`}
                key={item.id}
                className="notifications-link"
              >
                <Notification {...item} />
              </Link>
              // <Fragment key={item.id}>
              //   <Notification {...item} />
              // </Fragment>
            ))
          )}
        </div>
      )}
    </Page>
  );
}

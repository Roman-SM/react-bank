import "./index.css";
import Page from "../../component/page";
import StatusBar from "../../component/status-bar";
import BackButton from "../../component/back-button";
import NotificationsList from "../../component/notifications-list";

export default function Component() {
  return (
    <Page variant="gray">
      <StatusBar img="statusBarBlack" />
      <BackButton title="Notifications" retreat="retreat" />
      <NotificationsList
        title="New reward system"
        imageType="announcement"
        typeOperation="Announcement"
        date="18.04"
      />
      <NotificationsList
        title="New login"
        imageType="warning"
        typeOperation="Warning"
        date="19.04"
      />
    </Page>
  );
}

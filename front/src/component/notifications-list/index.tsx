import "./index.css";
import announcement from "./announcement.svg";
import warning from "./warning.svg";

type BalanceList = {
  title: string;
  imageType: "announcement" | "warning";
  date?: string | number;
  typeOperation: "Announcement" | "Warning";
};

const imageMap = {
  announcement: {
    src: announcement,
    alt: "Announcement image",
  },
  warning: {
    src: warning,
    alt: "Warning image",
  },
};

export default function Component({
  title,
  imageType,
  date,
  typeOperation,
}: BalanceList) {
  const { src, alt } = imageMap[imageType];

  return (
    <div className="notification-list-container">
      <div className="notification-list-left">
        <img src={src} alt={alt} />
        <div className="notification-list-info">
          <span className="notification-list-title">{title}</span>
          <div className="notification-list-descr">
            <span className="notification-list-date">{date}</span>
            <span>{typeOperation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

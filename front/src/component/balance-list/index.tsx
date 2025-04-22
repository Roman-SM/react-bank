import "./index.css";
import coinbace from "./coinbace.svg";
import stripe from "./stripe.svg";
import user from "./user.svg";

type BalanceList = {
  title: string;
  imageType: "coinbace" | "stripe" | "user";
  date?: string | number;
  typeOperation: "Receipt" | "Sending";
  balance: string;
  balanceType: string;
};

const imageMap = {
  coinbace: {
    src: coinbace,
    alt: "Coinbace",
  },
  stripe: {
    src: stripe,
    alt: "Stripe",
  },
  user: {
    src: user,
    alt: "User",
  },
};

export default function Component({
  title,
  imageType,
  balanceType,
  date,
  typeOperation,
  balance,
}: BalanceList) {
  const { src, alt } = imageMap[imageType];

  return (
    <div className="balance-list-container">
      <div className="balance-list-left">
        <img src={src} alt={alt} />
        <div className="balance-list-info">
          <span className="balance-list-title">{title}</span>
          <div className="balance-list-descr">
            <span className="balance-list-date">{date}</span>
            <span>{typeOperation}</span>
          </div>
        </div>
      </div>
      <span className={`balance-list-${balanceType}`}>{balance}</span>
    </div>
  );
}

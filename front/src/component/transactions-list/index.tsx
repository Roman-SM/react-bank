import "./index.css";
import coinbace from "./coinbace.svg";
import stripe from "./stripe.svg";
import user from "./user.svg";

type TransactionsList = {
  date: string;
  type: string;
  sum: number;
  typeEvent: string;
};

const icons: Record<string, string> = {
  Coinbace: coinbace,
  Stripe: stripe,
  User: user,
};

export default function Component({
  date,
  sum,
  type,
  typeEvent,
}: TransactionsList) {
  return (
    <div className="transactions-list-container">
      <div className="transactions-list-left">
        <img src={icons[typeEvent]} alt={typeEvent} />
        <div className="transactions-list-info">
          <span className="transactions-list-title">{typeEvent}</span>
          <div className="transactions-list-descr">
            <span className="transactions-list-date">{date}</span>
            <span>{type}</span>
          </div>
        </div>
      </div>
      <span className={`transactions-list-${type}`}>{sum.toFixed(2)}</span>
    </div>
  );
}

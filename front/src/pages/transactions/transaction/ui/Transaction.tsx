import "./TransactionStyle.css";
import { ReactComponent as TransactionCoinbace } from "@shared/ui/icons/coinbace.svg";
import { ReactComponent as TransactionStripe } from "@shared/ui/icons/stripe.svg";
import { ReactComponent as TransactionUser } from "@shared/ui/icons/user.svg";

type TransactionType = {
  date: string;
  type: string;
  sum: number;
  typeEvent: string;
};

const icons: Record<string, React.ReactNode> = {
  Coinbace: <TransactionCoinbace />,
  Stripe: <TransactionStripe />,
  User: <TransactionUser />,
};

export default function Transaction({
  date,
  sum,
  type,
  typeEvent,
}: TransactionType) {
  return (
    <div className="transactions-list-container">
      <div className="transactions-list-left">
        {icons[typeEvent]}
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

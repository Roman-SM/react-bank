import "./index.css";
import Divider from "../../component/divider";

type TransactionsList = {
  date: string;
  type: string;
  sum: number;
  email: string;
};

export default function Component({
  date,
  email,
  sum,
  type,
}: TransactionsList) {
  return (
    <div className="transaction-container">
      <span className={`transactions-sum-${type}`}>{sum.toFixed(2)}</span>
      <div className="transaction-container-info">
        <div className="transaction-item">
          <span className="transaction-item-info">Date</span>
          <span className="transaction-item-info">{date}</span>
        </div>
        <Divider variant="small" />
        <div className="transaction-item">
          <span className="transaction-item-info">Email</span>
          <span className="transaction-item-info">{email}</span>
        </div>
        <Divider variant="small" />
        <div className="transaction-item">
          <span className="transaction-item-info">Type</span>
          <span className="transaction-item-info">{type}</span>
        </div>
      </div>
    </div>
  );
}

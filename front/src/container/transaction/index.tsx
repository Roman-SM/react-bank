import "./index.css";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Divider from "../../component/divider";

const data = {
  title: "Transaction",
  sum: "+$100.20",
  info: {
    date: "Date",
    address: "Address",
    type: "Type",
  },
  transactionInfo: {
    dateTransaction: "25 May, 15:20",
    addressTransaction: "user123@mail.com",
    typeTransaction: "Recive",
  },
} as const;

const TransactionInfo = () => {
  return (
    <div className="transaction-container">
      <span className="transaction-title">{data.sum}</span>
      <div className="transaction-container-info">
        <div className="transaction-item">
          <span className="transaction-info">{data.info.date}</span>
          <span className="transaction-info">
            {data.transactionInfo.dateTransaction}
          </span>
        </div>
        <Divider variant="small" />
        <div className="transaction-item">
          <span className="transaction-info">{data.info.address}</span>
          <span className="transaction-info">
            {data.transactionInfo.addressTransaction}
          </span>
        </div>
        <Divider variant="small" />
        <div className="transaction-item">
          <span className="transaction-info">{data.info.type}</span>
          <span className="transaction-info">
            {data.transactionInfo.typeTransaction}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Component() {
  return (
    <Page variant="gray">
      <StatusBar img="statusBarBlack" />
      <BackButton title={data.title} retreat="retreat" />
      <TransactionInfo />
    </Page>
  );
}

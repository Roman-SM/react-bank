import "./index.css";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Divider from "../../component/divider";
import reciveCoinbace from "./recive-coinbace.svg";
import reciveStripe from "./recive-stripe.svg";
import coinbace from "./coinbace.svg";
import stripe from "./stripe.svg";

const data = {
  title: "Receive",
  amount: {
    title: "Receive amount",
    type: "text",
    name: "Amount",
  },
  payment: {
    title: "Payment system",
    textStripe: "Stripe",
    textCoinbase: "Coinbase",
  },
} as const;

const Amount = () => {
  return (
    <div>
      <label htmlFor={data.amount.name} className="amount-label">
        {data.amount.title}
      </label>
      <input
        type={data.amount.type}
        name={data.amount.name}
        className="amount-input"
      />
    </div>
  );
};

const PaymentSystem = () => {
  return (
    <div className="payment-system-container">
      <span className="payment-system-title">{data.payment.title}</span>
      <div className="payment-system-left">
        <div className="payment-system-item">
          <img src={coinbace} alt={data.payment.textCoinbase} />
          <span className="payment-system-text">
            {data.payment.textCoinbase}
          </span>
        </div>
        <img src={reciveCoinbace} alt={data.payment.textCoinbase} />
      </div>
      <div className="payment-system-left">
        <div className="payment-system-item">
          <img src={stripe} alt={data.payment.textStripe} />
          <span className="payment-system-text">{data.payment.textStripe}</span>
        </div>
        <img src={reciveStripe} alt={data.payment.textStripe} />
      </div>
    </div>
  );
};

export default function Component() {
  return (
    <Page variant="gray">
      <StatusBar img="statusBarBlack" />
      <BackButton title={data.title} retreat="retreat" />
      <Amount />
      <Divider variant="big" />
      <PaymentSystem />
    </Page>
  );
}

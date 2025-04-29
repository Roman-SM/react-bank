import "./index.css";
import reciveCoinbace from "./recive-coinbace.svg";
import reciveStripe from "./recive-stripe.svg";
import coinbace from "./coinbace.svg";
import stripe from "./stripe.svg";

type ButtonProps = {
  typeCoinbase: (e: React.FormEvent) => void;
  typeStripe: (e: React.FormEvent) => void;
  disabled?: boolean;
};

const data = {
  title: "Receive",
  amount: {
    title: "Receive amount",
    name: "sum",
  },
  payment: {
    title: "Payment system",
    textStripe: "Stripe",
    textCoinbase: "Coinbase",
  },
} as const;

export default function PaymentSystem({
  typeCoinbase,
  typeStripe,
  disabled,
}: ButtonProps) {
  return (
    <div className="payment-system-container">
      <span className="payment-system-title">{data.payment.title}</span>
      <button
        className="payment-system-left"
        onClick={typeCoinbase}
        disabled={disabled}
      >
        <div className="payment-system-item">
          <img src={coinbace} alt={data.payment.textCoinbase} />
          <span className="payment-system-text">
            {data.payment.textCoinbase}
          </span>
        </div>
        <img src={reciveCoinbace} alt={data.payment.textCoinbase} />
      </button>
      <button
        className="payment-system-left"
        onClick={typeStripe}
        disabled={disabled}
      >
        <div className="payment-system-item">
          <img src={stripe} alt={data.payment.textStripe} />
          <span className="payment-system-text">{data.payment.textStripe}</span>
        </div>
        <img src={reciveStripe} alt={data.payment.textStripe} />
      </button>
    </div>
  );
}

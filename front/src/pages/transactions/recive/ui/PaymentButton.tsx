import "./PaymentSystemStyle.css";
import { ReactComponent as CoinbaceRecive } from "./assets/recive-coinbace.svg";
import { ReactComponent as StripeRecive } from "./assets/recive-stripe.svg";
import { ReactComponent as Coinbace } from "@shared/ui/icons/coinbace.svg";
import { ReactComponent as Stripe } from "@shared/ui/icons/stripe.svg";
import { PaymentButtonsData } from "@shared/data";

type ButtonProps = {
  typeCoinbase: (e: React.FormEvent) => void;
  typeStripe: (e: React.FormEvent) => void;
  disabled: boolean;
};

export default function PaymentButton({
  typeCoinbase,
  typeStripe,
  disabled,
}: ButtonProps) {
  return (
    <>
      <div className="payment-system-container">
        <span className="payment-system-title">
          {PaymentButtonsData.payment.title}
        </span>
        <button
          className={
            disabled ? "payment-system-left-disabled" : "payment-system-left"
          }
          onClick={typeCoinbase}
          disabled={disabled}
        >
          <div className="payment-system-item">
            <Coinbace />
            <span className="payment-system-text">
              {PaymentButtonsData.payment.textCoinbase}
            </span>
          </div>
          <CoinbaceRecive />
        </button>
        <button
          className={
            disabled ? "payment-system-left-disabled" : "payment-system-left"
          }
          onClick={typeStripe}
          disabled={disabled}
        >
          <div className="payment-system-item">
            <Stripe />
            <span className="payment-system-text">
              {PaymentButtonsData.payment.textStripe}
            </span>
          </div>
          <StripeRecive />
        </button>
      </div>
    </>
  );
}

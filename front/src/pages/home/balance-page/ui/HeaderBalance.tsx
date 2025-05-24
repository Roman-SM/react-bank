import "./Balance.css";
import BackgroundImageBalance from "./assets/back-balance.svg";
import { ReactComponent as SettingsIcon } from "./assets/balance-settings.svg";
import { ReactComponent as NotificationIcon } from "./assets/balance-notifications.svg";
import { ReactComponent as ReceiveIcon } from "./assets/balance-receive.svg";
import { ReactComponent as SendIcon } from "./assets/balance-send.svg";
import { Link } from "react-router-dom";
import { Fragment } from "react";

export function HeaderBalance({ balance }: { balance: number | null }) {
  return (
    <Fragment>
      <img
        src={BackgroundImageBalance}
        alt=""
        className="balance-background-img"
      />
      <div className="balance-header">
        <section className="balance-nav">
          <Link to="/settings" aria-label="Balance settings">
            <SettingsIcon className="animation-icon" />
          </Link>
          <h1 className="balance-nav-title">Main wallet</h1>
          <Link to="/notifications" aria-label="Balance notifications">
            <NotificationIcon className="animation-icon" />
          </Link>
        </section>
        <section className="balance-status-balance">
          <span>$ {balance}</span>
        </section>
        <section className="balance-operations">
          <Link
            to="/recive"
            aria-label="Balance receive"
            className="balance-receive"
          >
            <ReceiveIcon className="animation-icon" />
            <span>Receive</span>
          </Link>
          <Link to="/send" aria-label="Balance send" className="balance-send">
            <SendIcon className="animation-icon" />
            <span>Send</span>
          </Link>
        </section>
      </div>
    </Fragment>
  );
}

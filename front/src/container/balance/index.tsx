import "./index.css";
import Page from "../../component/page";
import StatusBar from "../../component/status-bar";
import backBalance from "./back-balance.svg";
import settings from "./balance-settings.svg";
import notification from "./balance-notifications.svg";
import receive from "./balance-receive.svg";
import send from "./balance-send.svg";
import BalanceList from "../../component/balance-list";

function Header() {
  return (
    <div className="balance-header">
      <section className="balance-nav">
        <img src={settings} alt="Balance settings" />
        <h1 className="balance-nav-title">Main wallet</h1>
        <img src={notification} alt="Balance notifications" />
      </section>
      <section className="balance-status-balance">
        <span>$ </span>
        <span>100.20</span>
      </section>
      <section className="balance-operations">
        <img src={receive} alt="Balance notifications" />
        <img src={send} alt="Balance notifications" />
      </section>
    </div>
  );
}

export default function Component() {
  return (
    <Page>
      <StatusBar img="statusBarWhite" />
      <img
        src={backBalance}
        alt="Background balance"
        className="balance-background-img"
      />
      <Header />
      <BalanceList
        title="Stripe"
        imageType="stripe"
        balanceType="receipt"
        typeOperation="Receipt"
        balance="+$125.00"
        date="18.04"
      />
      <BalanceList
        title="Oleg V."
        imageType="coinbace"
        balanceType="sending"
        typeOperation="Receipt"
        balance="-$200.50"
        date="18.04"
      />
      <BalanceList
        title="Coinbase"
        imageType="coinbace"
        balanceType="receipt"
        typeOperation="Sending"
        balance="+$1,250.00"
        date="18.04"
      />
      <BalanceList
        title="Stripe"
        imageType="stripe"
        balanceType="receipt"
        typeOperation="Receipt"
        balance="+$125.00"
        date="18.04"
      />
      <BalanceList
        title="Diana K."
        imageType="user"
        balanceType="sending"
        typeOperation="Receipt"
        balance="-$125.00"
        date="18.04"
      />
      <BalanceList
        title="Stripe"
        imageType="stripe"
        balanceType="receipt"
        typeOperation="Sending"
        balance="+$125.00"
        date="18.04"
      />
      <BalanceList
        title="Stripe"
        imageType="stripe"
        balanceType="receipt"
        typeOperation="Sending"
        balance="+$15.00"
        date="18.04"
      />
    </Page>
  );
}

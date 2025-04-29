import "./index.css";
import Page from "../../component/page";
import StatusBar from "../../component/status-bar";
import backBalance from "./back-balance.svg";
import settings from "./balance-settings.svg";
import notification from "./balance-notifications.svg";
import receive from "./balance-receive.svg";
import send from "./balance-send.svg";
import TransactionsList from "../../component/transactions-list";
import { useAuth } from "../../util/useAuth";
import { useEffect, useState, Fragment, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import { Alert, Skeleton } from "../../component/load";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

interface RawData {
  transactions: {
    id: string;
    date: string;
    sum: number;
    type: string;
    typeEvent: string;
  }[];
}

const convertData = (raw: RawData) => ({
  list: [...(raw.transactions || [])]
    .reverse()
    .map(({ id, date, sum, type, typeEvent }) => ({
      id,
      date,
      sum,
      type,
      typeEvent,
    })),
  isEmpty: raw.transactions.length === 0,
});

function Header({ balance }: { balance: number }) {
  return (
    <div className="balance-header">
      <section className="balance-nav">
        <Link to="/settings">
          <img src={settings} alt="Balance settings" />
        </Link>
        <h1 className="balance-nav-title">Main wallet</h1>
        <Link to="/notifications">
          <img src={notification} alt="Balance notifications" />
        </Link>
      </section>
      <section className="balance-status-balance">
        <span>$ </span>
        <span>{balance}</span>
      </section>
      <section className="balance-operations">
        <Link to="/recive">
          <img src={receive} alt="Balance notifications" />
        </Link>
        <Link to="/send">
          <img src={send} alt="Balance notifications" />
        </Link>
      </section>
    </div>
  );
}

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const [balance, setBalance] = useState(0);
  const { states } = useAuth();

  useEffect(() => {
    document.title = "Balance";
  }, []);

  const getBalance = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:4000/balance", {
        method: "GET",
        headers: {
          Authorization: `${states.user?.email}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: REQUEST_ACTION_TYPE.RESET });
        setBalance(data.balance.toFixed(2));
      } else {
        dispatch({ type: REQUEST_ACTION_TYPE.ERROR, payload: data.message });
      }
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      });
    }
  }, [states.user?.email]);

  const getTransactions = useCallback(async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS });
    try {
      const res = await fetch("http://localhost:4000/transactions-list", {
        method: "GET",
        headers: {
          Authorization: `${states.user?.email}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: convertData(data),
        });
      } else {
        dispatch({ type: REQUEST_ACTION_TYPE.ERROR, payload: data.message });
      }
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      });
    }
  }, [states.user?.email]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <Page variant="white">
      <StatusBar img="statusBarWhite" />
      <img
        src={backBalance}
        alt="Background balance"
        className="balance-background-img"
      />
      <Header balance={balance} />
      {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
        <Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Fragment>
      )}
      {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
        <Fragment>
          {state.data.isEmpty ? (
            <Alert message="Список транзакцій пустий" />
          ) : (
            state.data.list.map((item: any) => (
              <Link
                to={`/transaction/${item.id}`}
                key={item.id}
                className="balance-transaction-link"
              >
                <TransactionsList {...item} />
              </Link>
            ))
          )}
        </Fragment>
      )}
    </Page>
  );
}

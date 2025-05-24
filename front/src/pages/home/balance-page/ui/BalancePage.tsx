import "./Balance.css";
import { Page, StatusBar } from "@shared/ui";
import TransactionsList from "@pages/transactions/transaction/ui/Transaction";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, Skeleton } from "@shared/ui/load/Load";
import { HeaderBalance } from "./HeaderBalance";
import { useBalance } from "../api/getBalance";
import { useTransaction } from "../api/getTransactions";
import { REQUEST_ACTION_TYPE } from "@shared/config";

export default function BalancePage() {
  const { balance } = useBalance();
  const state = useTransaction();
  useEffect(() => {
    document.title = "Balance Page";
  }, []);

  return (
    <Page>
      <StatusBar img="statusBarWhite" />
      <HeaderBalance balance={balance} />
      {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
        <Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Fragment>
      )}
      {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
        <div className="balance-transactions-list-scroll">
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
        </div>
      )}
    </Page>
  );
}

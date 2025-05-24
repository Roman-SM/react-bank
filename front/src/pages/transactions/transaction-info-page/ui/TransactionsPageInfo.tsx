import { Page, BackButton, StatusBar, Alert } from "@shared/ui";
import TransactionInfo from "@pages/transactions/transaction-info/ui/TransactionInfo";
import { Fragment, useEffect } from "react";
import { Skeleton } from "@shared/ui/load/Load";
import { REQUEST_ACTION_TYPE } from "@shared/config/request";
import { useTransactionInfo } from "../api/getTransaction";

export default function TransactionInfoPage() {
  const state = useTransactionInfo();
  useEffect(() => {
    document.title = "Transaction Page";
  }, []);
  return (
    <Page variant="gray">
      <StatusBar />
      <BackButton title="Transaction" retreat="retreat" backBalance={true} />
      {state.status === REQUEST_ACTION_TYPE.PROGRESS && <Skeleton />}
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
      {state.status === REQUEST_ACTION_TYPE.SUCCESS &&
        state.data.list.map((item: any) => (
          <Fragment key={item.id}>
            <TransactionInfo {...item} />
          </Fragment>
        ))}
    </Page>
  );
}

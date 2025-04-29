import "./index.css";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import TransactionInfo from "../../component/transaction-info";
import { Alert } from "../../component/load";
import { useEffect, useReducer, useCallback, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "../../component/load";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

const convertData = (raw: {
  transaction: {
    id: number;
    date: string;
    email: string;
    sum: string;
    type: string;
  };
}) => ({
  list: [raw.transaction],
  isEmpty: false,
});

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { transactionId } = useParams();
  useEffect(() => {
    document.title = "Transaction";
  }, []);

  const getTransactions = useCallback(async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS });
    try {
      const res = await fetch("http://localhost:4000/transaction-info", {
        method: "GET",
        headers: {
          Authorization: `${transactionId}`,
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
  }, [transactionId]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);
  return (
    <Page variant="gray">
      <StatusBar img="statusBarBlack" />
      <BackButton title="Transaction" retreat="retreat" />
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

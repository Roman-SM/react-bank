import "./index.css";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Divider from "../../component/divider";
import PaymentSystem from "../../component/payment-system";
import FieldCode from "../../component/field-code";
import { useAuth } from "../../util/useAuth";
import { useEffect, useReducer } from "react";
import { useValidate } from "../../util/validation";
import { Alert } from "../../component/load";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

const data = {
  title: "Receive",
  amount: {
    title: "Receive amount",
    name: "sum",
  },
} as const;

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);

  useEffect(() => {
    document.title = "Recive";
  }, []);
  const { states } = useAuth();

  const { formData, handleChange, resetForm } = useValidate({
    sum: "",
  });

  const handleReciveCoinbase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/recive-coinbase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sum: formData.sum,
          email: states.user?.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({ type: REQUEST_ACTION_TYPE.RESET });
        resetForm();
      } else {
        dispatch({ type: REQUEST_ACTION_TYPE.ERROR, payload: data.message });
      }
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      });
    }
  };

  const handleReciveStripe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/recive-stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sum: formData.sum,
          email: states.user?.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch({ type: REQUEST_ACTION_TYPE.RESET });
        resetForm();
      } else {
        dispatch({ type: REQUEST_ACTION_TYPE.ERROR, payload: data.message });
      }
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      });
    }
  };

  return (
    <Page variant="gray">
      <StatusBar img="statusBarBlack" />
      <BackButton title={data.title} retreat="retreat" />
      <FieldCode
        variant="white"
        text={data.amount.title}
        value={formData.sum}
        onChange={handleChange}
        name={data.amount.name}
        placeholder="Enter sum"
      />
      <Divider variant="big" />
      <PaymentSystem
        typeCoinbase={handleReciveCoinbase}
        typeStripe={handleReciveStripe}
        disabled={!Object.values(formData).every((val) => val.trim() !== "")}
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
    </Page>
  );
}

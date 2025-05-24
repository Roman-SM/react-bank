import { useAuth, useValidate } from "@shared/lib";
import { Alert, Divider, FieldCode } from "@shared/ui";
import PaymentButton from "./PaymentButton";
import { useReducer } from "react";
import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { PaymentFormData } from "@shared/data";
import { ConfirmProps } from "@shared/types";

export default function PaymentForm({ modalOpen }: ConfirmProps) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { states } = useAuth();
  const { formData, handleChange, resetForm, errors } = useValidate({
    sum: "",
  });

  const handleReciveCoinbase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendBaseUrl}/recive-coinbase`, {
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
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: data,
        });
        modalOpen(true);
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
      const res = await fetch(`${backendBaseUrl}/recive-stripe`, {
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
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: data,
        });
        modalOpen(true);
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
    <>
      <FieldCode
        variant="white"
        text={PaymentFormData.title}
        name={PaymentFormData.name}
        value={formData.sum}
        onChange={handleChange}
        placeholder={PaymentFormData.placeholder.placeholderCode}
        error={errors.sum}
      />
      <Divider variant="big" />
      <PaymentButton
        typeCoinbase={handleReciveCoinbase}
        typeStripe={handleReciveStripe}
        disabled={
          !Object.values(formData).every((val) => val.trim() !== "") ||
          Object.values(errors).some((err) => !!err)
        }
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
    </>
  );
}

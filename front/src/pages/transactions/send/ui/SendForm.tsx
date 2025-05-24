import { useAuth, useValidate } from "@shared/lib";
import { Alert, Button, FieldCode, FieldEmail, Form } from "@shared/ui";
import { useReducer } from "react";
import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { FormSendData } from "@shared/data";
import { ConfirmProps } from "@shared/types";

export default function SendForm({ modalOpen }: ConfirmProps) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { states } = useAuth();
  const { formData, errors, handleChange, resetForm } = useValidate({
    email: "",
    sum: "",
  });

  const handleSendTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendBaseUrl}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: states.user?.email,
          recipientEmail: formData.email,
          sum: formData.sum,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: data.message,
        });
        modalOpen(true);
        resetForm();
      } else {
        dispatch({
          type: REQUEST_ACTION_TYPE.ERROR,
          payload: data.message,
        });
      }
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      });
    }
  };

  return (
    <Form>
      <FieldEmail
        variant="white"
        name={FormSendData.emailName.email}
        value={formData.email}
        onChange={handleChange}
      />
      <FieldCode
        variant="white"
        text={FormSendData.text}
        value={formData.sum}
        onChange={handleChange}
        name={FormSendData.name}
        placeholder={FormSendData.placeholder.placeholderSum}
        error={errors.sum}
      />
      <Button
        text={FormSendData.button.SendTransfer}
        onClick={handleSendTransaction}
        disabled={
          !Object.values(formData).every((val) => val.trim() !== "") ||
          Object.values(errors).some((err) => !!err)
        }
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
    </Form>
  );
}

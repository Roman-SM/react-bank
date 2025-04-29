import "./index.css";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import FieldCode from "../../component/field-code";
import Form from "../../component/form";
import FieldEmail from "../../component/field-email";
import Button from "../../component/button";
import { useEffect, useReducer } from "react";
import { useAuth } from "../../util/useAuth";
import { useValidate } from "../../util/validation";
import { Alert } from "../../component/load";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

const data = {
  title: "Send",
  button: "Make a transfer",
  formSend: {
    text: "Sum",
    name: "sum",
    emailName: "email",
  },
} as const;

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);

  useEffect(() => {
    document.title = "Send";
  }, []);
  const { states } = useAuth();

  const { formData, errors, handleChange, resetForm } = useValidate({
    email: "",
    sum: "",
  });

  const handleSendTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/send", {
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
        dispatch({ type: REQUEST_ACTION_TYPE.RESET });
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: data.message,
        });
        console.log(state.data);
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
    <Page variant="gray">
      <StatusBar img="statusBarBlack" />
      <BackButton title={data.title} retreat="retreat" />
      <Form>
        <FieldEmail
          variant="white"
          name={data.formSend.emailName}
          value={formData.email}
          onChange={handleChange}
        />
        <FieldCode
          variant="white"
          text={data.formSend.text}
          value={formData.sum}
          onChange={handleChange}
          name={data.formSend.name}
          placeholder="Enter sum"
        />
        <Button
          text={data.button}
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
    </Page>
  );
}

import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Form from "../../component/form";
import Button from "../../component/button";
import FieldEmail from "../../component/field-email";
import { useEffect, useReducer } from "react";
import { useValidate } from "../../util/validation";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../component/load";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

const data = {
  title: {
    text: "Recover password",
    description: "Choose a recovery method",
  },
  button: "Continue",
  emailName: "email",
} as const;

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Recovery";
  }, []);
  const { formData, handleChange } = useValidate({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: REQUEST_ACTION_TYPE.RESET });
        navigate("/recovery-confirm");
        setTimeout(() => alert(`Ваш код підтвердження ${data.code}`), 1000);
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
    <Page variant="white">
      <StatusBar img="statusBarBlack" />
      <BackButton />
      <Title title={data.title.text} description={data.title.description} />
      <Form>
        <FieldEmail
          name={data.emailName}
          value={formData.email}
          onChange={handleChange}
        />
        <Button
          text={data.button}
          onClick={handleSubmit}
          disabled={!Object.values(formData).every((val) => val.trim() !== "")}
        />
        {state.status === REQUEST_ACTION_TYPE.ERROR && (
          <Alert status={state.status} message={state.message} />
        )}
      </Form>
    </Page>
  );
}

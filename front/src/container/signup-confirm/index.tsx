import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import FieldCode from "../../component/field-code";
import Form from "../../component/form";
import { useAuth } from "../../util/useAuth";
import { useValidate } from "../../util/validation";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../component/load";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

const data = {
  title: {
    text: "Confirm account",
    description: "Write the code you received",
  },
  button: "Confirm",

  fieldCode: {
    text: "Code",
    name: "code",
  },
};

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();
  const { states } = useAuth();

  useEffect(() => {
    document.title = "Signup confirm";
  }, []);

  const { formData, handleChange } = useValidate({
    code: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/signup-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: Number(formData.code),
          token: states.token,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: REQUEST_ACTION_TYPE.RESET });
        const session = {
          token: data.session.token,
          user: data.session.user,
        };
        localStorage.setItem("sessionAuth", JSON.stringify(session));
        navigate("/balance");
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
        <FieldCode
          text={data.fieldCode.text}
          value={formData.code}
          onChange={handleChange}
          name={data.fieldCode.name}
          placeholder="Enter code"
        />
        <Button
          text={data.button}
          onClick={handleSubmit}
          disabled={
            !Object.values(formData.code).every((val) => val.trim() !== "")
          }
        />
        {state.status === REQUEST_ACTION_TYPE.ERROR && (
          <Alert status={state.status} message={state.message} />
        )}
      </Form>
    </Page>
  );
}

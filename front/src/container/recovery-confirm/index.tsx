import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import FieldCode from "../../component/field-code";
import Form from "../../component/form";
import Button from "../../component/button";
import FieldPassword from "../../component/field-password";
import { Alert } from "../../component/load";
import { useEffect, useReducer } from "react";
import { useValidate } from "../../util/validation";
import { useNavigate } from "react-router-dom";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

const data = {
  title: {
    text: "Recover password",
    description: "Write the code you received",
  },
  button: "Restore password",
  fieldCode: {
    text: "Code",
    name: "code",
  },
  fieldPassword: {
    text: "New password",
    name: "newPassword",
  },
} as const;

export default function Component() {
  const [states, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Recovery confirm";
  }, []);

  const { formData, handleChange, errors, validateAll } = useValidate({
    newPassword: "",
    code: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch("http://localhost:4000/recovery-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: Number(formData.code),
            password: formData.newPassword,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          dispatch({ type: REQUEST_ACTION_TYPE.RESET });
          navigate("/signin");
        } else {
          dispatch({ type: REQUEST_ACTION_TYPE.ERROR, payload: data.message });
        }
      } catch (error: any) {
        dispatch({
          type: REQUEST_ACTION_TYPE.ERROR,
          payload: error.message,
        });
      }
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
        <FieldPassword
          text={data.fieldPassword.text}
          onChange={handleChange}
          value={formData.newPassword}
          name={data.fieldPassword.name}
          error={errors.newPassword}
        />
        <Button
          text={data.button}
          onClick={handleSubmit}
          disabled={!Object.values(formData).every((val) => val.trim() !== "")}
        />
        {states.status === REQUEST_ACTION_TYPE.ERROR && (
          <Alert status={states.status} message={states.message} />
        )}
      </Form>
    </Page>
  );
}

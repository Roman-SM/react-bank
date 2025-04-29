import "./index.css";
import Page from "../../component/page";
import StatusBar from "../../component/status-bar";
import BackButton from "../../component/back-button";
import Title from "../../component/title";
import Form from "../../component/form";
import FieldPassword from "../../component/field-password";
import FieldEmail from "../../component/field-email";
import Button from "../../component/button";
import Link from "../../component/link";
import { useNavigate } from "react-router-dom";
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
  title: {
    text: "Sign in",
    description: "Choose a registration method",
  },
  button: "Continue",
  name: {
    email: "email",
    password: "password",
  },
  link: {
    text: "Forgot your password?",
    textLink: "Restore",
    link: "/recovery",
  },
} as const;

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();
  const { dispatches } = useAuth();

  useEffect(() => {
    document.title = "Signin";
  }, []);

  const { formData, handleChange, validateAll } = useValidate({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch("http://localhost:4000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: REQUEST_ACTION_TYPE.RESET });
          const session = {
            token: data.session.token,
            user: data.session.user,
          };
          dispatches({
            type: "LOGIN",
            payload: { token: session.token, user: session.user },
          });
          localStorage.setItem("sessionAuth", JSON.stringify(session));
          if (!session.user.isConfirm) {
            navigate("/signup-confirm");
            setTimeout(() => alert(`Ваш код підтвердження ${data.code}`), 1000);
          } else {
            navigate("/balance");
          }
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
    }
  };

  return (
    <Page variant="white">
      <StatusBar img="statusBarBlack" />
      <BackButton />
      <Title title={data.title.text} description={data.title.description} />
      <Form>
        <FieldEmail
          name={data.name.email}
          value={formData.email}
          onChange={handleChange}
        />
        <FieldPassword
          name={data.name.password}
          value={formData.password}
          onChange={handleChange}
        />
        <Link
          text={data.link.text}
          textLink={data.link.textLink}
          link={data.link.link}
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

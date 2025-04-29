import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Form from "../../component/form";
import FieldPassword from "../../component/field-password";
import FieldEmail from "../../component/field-email";
import Button from "../../component/button";
import Link from "../../component/link";
import { useEffect, useReducer } from "react";
import { useValidate } from "../../util/validation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../util/useAuth";
import { Alert } from "../../component/load";
import {
  requestInitialState,
  requestReducer,
  REQUEST_ACTION_TYPE,
} from "../../util/request";

const data = {
  title: {
    text: "Sign up",
    description: "Select login method",
  },
  button: "Continue",
  name: {
    email: "email",
    password: "password",
  },
  link: {
    text: "Already have an account? ",
    textLink: "Sign In",
    link: "/signin",
  },
} as const;

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();
  const { dispatches } = useAuth();

  useEffect(() => {
    document.title = "Signup";
  }, []);

  const { formData, errors, handleChange, validateAll } = useValidate({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch("http://localhost:4000/signup", {
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
          navigate("/signup-confirm");
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
          error={errors.email}
        />
        <FieldPassword
          onChange={handleChange}
          value={formData.password}
          name={data.name.password}
          error={errors.password}
        />
        <Link
          text={data.link.text}
          textLink={data.link.textLink}
          link={data.link.link}
        />
        <Button
          text={data.button}
          onClick={handleSubmit}
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

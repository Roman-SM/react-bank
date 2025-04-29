import "./index.css";
import Page from "../../component/page";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Form from "../../component/form";
import FieldPassword from "../../component/field-password";
import FieldEmail from "../../component/field-email";
import Divider from "../../component/divider";
import { useCallback, useEffect, useReducer } from "react";
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
    text: "Sign up",
    description: "Select login method",
  },
  button: {
    changeEmail: "Change Email",
    changePassword: "Change Password",
    logOut: "Log out",
  },
  changePassword: {
    textOldPassword: "Old Password",
    textNewPassword: "New password",
  },
  name: {
    email: "email",
    password: "password",
    oldPassword: "oldPassword",
    newPassword: "newPassword",
  },
} as const;

export default function Component() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);

  const { states } = useAuth();

  useEffect(() => {
    document.title = "Settings";
  }, []);

  const { validateAll, handleLogout } = useValidate({});

  const formEmail = useValidate({
    email: "",
    password: "",
  });

  const formPassword = useValidate({
    oldPassword: "",
    newPassword: "",
  });

  const handleRecoveryEmail = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (validateAll()) {
        try {
          const res = await fetch("http://localhost:4000/recovery-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: states.user?.email,
              newEmail: formEmail.formData.email,
              password: formEmail.formData.password,
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
            formEmail.resetForm();
          } else {
            dispatch({
              type: REQUEST_ACTION_TYPE.ERROR_EMAIL,
              payload: data.message,
            });
          }
        } catch (error: any) {
          dispatch({
            type: REQUEST_ACTION_TYPE.ERROR_EMAIL,
            payload: error.message,
          });
        }
      }
    },
    [formEmail, states.user?.email, validateAll]
  );

  const handleRecoveryPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (validateAll()) {
        try {
          const res = await fetch("http://localhost:4000/recovery-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: states.user?.email,
              oldPassword: formPassword.formData.oldPassword,
              newPassword: formPassword.formData.newPassword,
            }),
          });

          const data = await res.json();
          if (res.ok) {
            dispatch({ type: REQUEST_ACTION_TYPE.RESET });
            formPassword.resetForm();
          } else {
            dispatch({
              type: REQUEST_ACTION_TYPE.ERROR_PASSWORD,
              payload: data.message,
            });
          }
        } catch (error: any) {
          dispatch({
            type: REQUEST_ACTION_TYPE.ERROR_PASSWORD,
            payload: error.message,
          });
        }
      }
    },
    [formPassword, states.user?.email, validateAll]
  );

  return (
    <Page variant="white">
      <StatusBar img="statusBarBlack" />
      <BackButton title="Settings" retreat="retreat" />
      <Form>
        <FieldEmail
          name={data.name.email}
          value={formEmail.formData.email}
          onChange={formEmail.handleChange}
          error={formEmail.errors.email}
        />
        <FieldPassword
          text={data.changePassword.textOldPassword}
          name={data.name.password}
          value={formEmail.formData.password}
          onChange={formEmail.handleChange}
        />
        {state.status === REQUEST_ACTION_TYPE.ERROR_EMAIL && (
          <Alert status={state.status} message={state.message} />
        )}
        <Button
          text={data.button.changeEmail}
          onClick={handleRecoveryEmail}
          disabled={
            !Object.values(formEmail.formData).every(
              (val) => val.trim() !== ""
            ) || Object.values(formEmail.errors).some((err) => !!err)
          }
        />
      </Form>
      <Divider variant="big" />
      <Form>
        <FieldPassword
          text={data.changePassword.textOldPassword}
          name={data.name.oldPassword}
          onChange={formPassword.handleChange}
          value={formPassword.formData.oldPassword}
        />
        <FieldPassword
          text={data.changePassword.textNewPassword}
          name={data.name.newPassword}
          onChange={formPassword.handleChange}
          value={formPassword.formData.newPassword}
          error={formPassword.errors.newPassword}
        />
        {state.status === REQUEST_ACTION_TYPE.ERROR_PASSWORD && (
          <Alert status={state.status} message={state.message} />
        )}
        <Button
          text={data.button.changePassword}
          onClick={handleRecoveryPassword}
          disabled={
            !Object.values(formPassword.formData).every(
              (val) => val.trim() !== ""
            ) || Object.values(formPassword.errors).some((err) => !!err)
          }
        />
      </Form>
      <Divider variant="big" />
      <Button
        variant="outline-red"
        text={data.button.logOut}
        onClick={handleLogout}
      />
    </Page>
  );
}

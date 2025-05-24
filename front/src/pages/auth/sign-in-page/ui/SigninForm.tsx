import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { useAuth, useValidate } from "@shared/lib";
import { Button, FieldPassword, FieldEmail, Alert, Form } from "@shared/ui";
import Link from "@shared/ui/link/Link";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { SigninFormData } from "@shared/data";
import { ConfirmProps } from "@shared/types";

export function SignInForm({ modalOpen }: ConfirmProps) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();
  const { dispatches } = useAuth();
  const { formData, handleChange, validateAll } = useValidate({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch(`${backendBaseUrl}/signin`, {
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
          modalOpen(true);
          if (!session.user.isConfirm) {
            setTimeout(() => navigate("/signup-confirm"), 1000);
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
    <Form>
      <FieldEmail
        name={SigninFormData.name.email}
        value={formData.email}
        onChange={handleChange}
      />
      <FieldPassword
        name={SigninFormData.name.password}
        value={formData.password}
        onChange={handleChange}
      />
      <Link
        text={SigninFormData.link.text}
        textLink={SigninFormData.link.textLink}
        link={SigninFormData.link.link}
      />
      <Button
        text={SigninFormData.button.Continue}
        onClick={handleSubmit}
        disabled={!Object.values(formData).every((val) => val.trim() !== "")}
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
    </Form>
  );
}

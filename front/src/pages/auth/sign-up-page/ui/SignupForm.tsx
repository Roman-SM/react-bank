import { useValidate } from "@shared/lib";
import { Button, FieldPassword, FieldEmail, Alert, Form } from "@shared/ui";
import { backendBaseUrl } from "@shared/config/backendUrl";
import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config/request";
import { useReducer } from "react";
import { useAuth } from "@shared/lib/guards/UseAuth";
import { useNavigate } from "react-router-dom";
import Link from "@shared/ui/link/Link";
import { SignupFormData } from "@shared/data";

export default function SignUpForm() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();
  const { dispatches } = useAuth();
  const { formData, errors, handleChange, validateAll } = useValidate({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch(`${backendBaseUrl}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
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
    <Form>
      <FieldEmail
        name={SignupFormData.name.email}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FieldPassword
        name={SignupFormData.name.password}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Link
        text={SignupFormData.link.text}
        textLink={SignupFormData.link.textLink}
        link={SignupFormData.link.link}
      />
      <Button
        text={SignupFormData.button.Continue}
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
  );
}

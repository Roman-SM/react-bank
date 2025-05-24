import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { useAuth, useValidate } from "@shared/lib";
import { Alert, Button, FieldCode, Form } from "@shared/ui";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { SignupConfirmFormData } from "@shared/data";
import { ConfirmProps } from "@shared/types";

export function SignUpConfirmForm({ modalOpen }: ConfirmProps) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { states } = useAuth();
  const navigate = useNavigate();
  const { formData, handleChange } = useValidate({
    code: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendBaseUrl}/signup-confirm`, {
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
        const session = {
          token: data.session.token,
          user: data.session.user,
        };
        localStorage.setItem("sessionAuth", JSON.stringify(session));
        modalOpen(true);
        setTimeout(() => navigate("/balance"), 1000);
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
    <Form>
      <FieldCode
        text={SignupConfirmFormData.fieldCode.text}
        value={formData.code}
        onChange={handleChange}
        name={SignupConfirmFormData.fieldCode.name}
        placeholder={SignupConfirmFormData.fieldCode.placeholderCode}
      />
      <Button
        text={SignupConfirmFormData.button.Confirm}
        onClick={handleSubmit}
        disabled={
          !Object.values(formData.code).every((val) => val.trim() !== "")
        }
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
    </Form>
  );
}

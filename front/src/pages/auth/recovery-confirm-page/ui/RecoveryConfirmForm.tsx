import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { useValidate } from "@shared/lib";
import { Button, FieldPassword, FieldCode, Alert, Form } from "@shared/ui";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { RecoveryConfirmFormData } from "@shared/data";
import { ConfirmProps } from "@shared/types";

export function RecoveryConfirmForm({ modalOpen }: ConfirmProps) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();
  const { formData, handleChange, errors, validateAll } = useValidate({
    newPassword: "",
    code: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch(`${backendBaseUrl}/recovery-confirm`, {
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
          dispatch({
            type: REQUEST_ACTION_TYPE.SUCCESS,
            payload: data,
          });
          modalOpen(true);
          setTimeout(() => navigate("/signin"), 1000);
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
      <FieldCode
        text={RecoveryConfirmFormData.fieldCode.text}
        value={formData.code}
        onChange={handleChange}
        name={RecoveryConfirmFormData.fieldCode.name}
        placeholder={RecoveryConfirmFormData.fieldCode.placeholderCode}
      />
      <FieldPassword
        text={RecoveryConfirmFormData.fieldPassword.text}
        onChange={handleChange}
        value={formData.newPassword}
        name={RecoveryConfirmFormData.fieldPassword.name}
        error={errors.newPassword}
      />
      <Button
        text={RecoveryConfirmFormData.button.RestorePassword}
        onClick={handleSubmit}
        disabled={!Object.values(formData).every((val) => val.trim() !== "")}
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
    </Form>
  );
}

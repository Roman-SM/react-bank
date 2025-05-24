import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { useAuth, useValidate } from "@shared/lib";
import { Alert, Button, FieldPassword, Form } from "@shared/ui";
import { useReducer } from "react";
import { UpdatePasswordFormData } from "@shared/data";
import { ConfirmProps } from "@shared/types";

export default function UpdatePasswordForm({ modalOpen }: ConfirmProps) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { states } = useAuth();
  const { validateAll } = useValidate({});

  const formPassword = useValidate({
    oldPassword: "",
    newPassword: "",
  });

  const handleRecoveryPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch(`${backendBaseUrl}/recovery-password`, {
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
          dispatch({
            type: REQUEST_ACTION_TYPE.SUCCESS,
            payload: data,
          });
          modalOpen(true);
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
  };

  return (
    <Form>
      <h2 className="form-header">Change password</h2>
      <FieldPassword
        text={UpdatePasswordFormData.textOldPassword.text}
        name={UpdatePasswordFormData.textOldPassword.name}
        onChange={formPassword.handleChange}
        value={formPassword.formData.oldPassword}
      />
      <FieldPassword
        text={UpdatePasswordFormData.textNewPassword.text}
        name={UpdatePasswordFormData.textNewPassword.name}
        onChange={formPassword.handleChange}
        value={formPassword.formData.newPassword}
        error={formPassword.errors.newPassword}
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR_PASSWORD && (
        <Alert status={state.status} message={state.message} />
      )}
      <Button
        text={UpdatePasswordFormData.button.SavePassword}
        onClick={handleRecoveryPassword}
        disabled={
          !Object.values(formPassword.formData).every(
            (val) => val.trim() !== ""
          ) || Object.values(formPassword.errors).some((err) => !!err)
        }
      />
    </Form>
  );
}

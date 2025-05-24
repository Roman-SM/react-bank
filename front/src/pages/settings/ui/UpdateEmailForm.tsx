import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { useAuth, useValidate } from "@shared/lib";
import { Alert, Button, FieldEmail, FieldPassword, Form } from "@shared/ui";
import { useReducer } from "react";
import { UpdateEmailFormData } from "@shared/data";
import { ConfirmProps } from "@shared/types";

export default function UpdateEmailForm({ modalOpen }: ConfirmProps) {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const { states } = useAuth();
  const { validateAll } = useValidate({});

  const formEmail = useValidate({
    email: "",
    password: "",
  });

  const handleRecoveryEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      try {
        const res = await fetch(`${backendBaseUrl}/recovery-email`, {
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
          const session = {
            token: data.session.token,
            user: data.session.user,
          };
          localStorage.setItem("sessionAuth", JSON.stringify(session));
          dispatch({
            type: REQUEST_ACTION_TYPE.SUCCESS,
            payload: data,
          });
          modalOpen(true);
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
  };

  return (
    <Form>
      <h2 className="form-header">Change email</h2>
      <FieldEmail
        name={UpdateEmailFormData.name.email}
        value={formEmail.formData.email}
        error={formEmail.errors.email}
        onChange={formEmail.handleChange}
      />
      <FieldPassword
        name={UpdateEmailFormData.name.password}
        value={formEmail.formData.password}
        onChange={formEmail.handleChange}
        text={UpdateEmailFormData.textOldPassword.text}
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR_EMAIL && (
        <Alert status={state.status} message={state.message} />
      )}
      <Button
        text={UpdateEmailFormData.button.SaveEmail}
        onClick={handleRecoveryEmail}
        disabled={
          !Object.values(formEmail.formData).every(
            (val) => val.trim() !== ""
          ) || Object.values(formEmail.errors).some((err) => !!err)
        }
      />
    </Form>
  );
}

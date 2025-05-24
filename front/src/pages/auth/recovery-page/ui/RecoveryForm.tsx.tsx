import {
  backendBaseUrl,
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReducer,
} from "@shared/config";
import { useValidate } from "@shared/lib";
import { Alert, Button, FieldEmail, Form } from "@shared/ui";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { RecoveryData } from "@shared/data";

export function RecoveryForm() {
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  const navigate = useNavigate();
  const { formData, handleChange } = useValidate({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendBaseUrl}/recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: REQUEST_ACTION_TYPE.RESET });
        navigate("/recovery-confirm");
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
  };

  return (
    <Form>
      <FieldEmail
        name={RecoveryData.name.email}
        value={formData.email}
        onChange={handleChange}
      />
      <Button
        text={RecoveryData.button.Continue}
        onClick={handleSubmit}
        disabled={!Object.values(formData).every((val) => val.trim() !== "")}
      />
      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}
    </Form>
  );
}

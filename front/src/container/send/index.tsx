import "./index.css";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import FieldCode from "../../component/field-code";
import Form from "../../component/form";
import FieldEmail from "../../component/field-email";
import Button from "../../component/button";
import { Validate } from "../../util/validation";

const data = {
  title: "Send",
  button: "Restore password",
  formConfirm: {
    text: "Sum",
    name: "code",
  },
  emailName: "email",
} as const;

export default function Component() {
  const { formData, errors, handleChange, handleSubmit } = Validate({
    email: "",
    code: "",
  });
  return (
    <Page>
      <StatusBar img="statusBarBlack" />
      <BackButton title={data.title} retreat="retreat" />
      <Form>
        <FieldEmail
          name={data.emailName}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FieldCode
          text={data.formConfirm.text}
          value={formData.code}
          onChange={handleChange}
          name={data.formConfirm.name}
          placeholder="Enter code"
        />
        <Button
          text={data.button}
          onClick={handleSubmit}
          disabled={
            !Object.values(formData).every((val) => val.trim() !== "") ||
            Object.values(errors).some((err) => !!err)
          }
        />
      </Form>
    </Page>
  );
}

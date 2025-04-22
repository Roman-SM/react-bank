import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Form from "../../component/form";
import Button from "../../component/button";
import FieldEmail from "../../component/field-email";
import { Validate } from "../../util/validation";

const data = {
  title: {
    text: "Recover password",
    description: "Choose a recovery method",
  },
  button: "Continue",
  emailName: "email",
} as const;

export default function Component() {
  const { formData, handleChange, handleSubmitNoValidate } = Validate({
    email: "",
  });
  return (
    <Page>
      <StatusBar img="statusBarBlack" />
      <BackButton />
      <Title title={data.title.text} description={data.title.description} />

      <Form>
        <FieldEmail
          name={data.emailName}
          value={formData.email}
          onChange={handleChange}
        />
        <Button
          text={data.button}
          onClick={handleSubmitNoValidate}
          disabled={!Object.values(formData).every((val) => val.trim() !== "")}
        />
      </Form>
    </Page>
  );
}

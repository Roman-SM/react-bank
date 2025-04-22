import "./index.css";
import Page from "../../component/page";
import StatusBar from "../../component/status-bar";
import BackButton from "../../component/back-button";
import Title from "../../component/title";
import Form from "../../component/form";
import FieldPassword from "../../component/field-password";
import FieldEmail from "../../component/field-email";
import Button from "../../component/button";
import Link from "../../component/link";
import { Validate } from "../../util/validation";

const data = {
  title: {
    text: "Sign in",
    description: "Choose a registration method",
  },
  button: "Continue",
  name: {
    email: "email",
    password: "password",
  },
  link: {
    text: "Forgot your password?",
    textLink: "Restore",
    link: "/recovery",
  },
} as const;

export default function Component() {
  const { formData, handleChange, handleSubmitNoValidate } = Validate({
    email: "",
    password: "",
  });
  return (
    <Page>
      <StatusBar img="statusBarBlack" />
      <BackButton />
      <Title title={data.title.text} description={data.title.description} />
      <Form>
        <FieldEmail
          name={data.name.email}
          value={formData.email}
          onChange={handleChange}
        />
        <FieldPassword
          onChange={handleChange}
          value={formData.password}
          name={data.name.password}
        />
        <Link
          text={data.link.text}
          textLink={data.link.textLink}
          link={data.link.link}
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

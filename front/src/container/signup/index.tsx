import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Form from "../../component/form";
import FieldPassword from "../../component/field-password";
import FieldEmail from "../../component/field-email";
import Button from "../../component/button";
import Link from "../../component/link";
import { Validate } from "../../util/validation";

const data = {
  title: {
    text: "Sign up",
    description: "Select login method",
  },
  button: "Continue",
  name: {
    email: "email",
    password: "password",
  },
  link: {
    text: "Already have an account? ",
    textLink: "Sign In",
    link: "/signin",
  },
} as const;

export default function Component() {
  const { formData, errors, handleChange, handleSubmit } = Validate({
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
          error={errors.email}
        />
        <FieldPassword
          onChange={handleChange}
          value={formData.password}
          name={data.name.password}
          error={errors.password}
        />
        <Link
          text={data.link.text}
          textLink={data.link.textLink}
          link={data.link.link}
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

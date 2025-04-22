import "./index.css";
import Page from "../../component/page";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import StatusBar from "../../component/status-bar";
import Form from "../../component/form";
import FieldPassword from "../../component/field-password";
import FieldEmail from "../../component/field-email";
import { Validate } from "../../util/validation";

const data = {
  title: {
    text: "Sign up",
    description: "Select login method",
  },
  button: {
    changeEmail: "Save Email",
    changePassword: "Save Password",
    logOut: "Log out",
  },
  changePassword: {
    textOldPassword: "Old Password",
    textNewPassword: "New password",
  },
  name: {
    email: "email",
    password: "password",
    oldPassword: "oldPassword",
    newPassword: "newPassword",
  },
} as const;

export default function Component() {
  // const { formData, errors, handleChange, handleSubmit } = Validate({
  //   email: "",
  //   password: "",
  //   oldPassword: "",
  //   newPassword: "",
  // });

  const formEmail = Validate({
    email: "",
    password: "",
  });
  const formPassword = Validate({
    oldPassword: "",
    newPassword: "",
  });

  return (
    <Page>
      <StatusBar img="statusBarBlack" />
      <BackButton title="Settings" retreat="retreat" />
      <Form>
        <FieldEmail
          name={data.name.email}
          value={formEmail.formData.email}
          onChange={formEmail.handleChange}
          error={formEmail.errors.email}
        />
        <FieldPassword
          text={data.changePassword.textOldPassword}
          name={data.name.password}
          value={formEmail.formData.password}
          onChange={formEmail.handleChange}
          error={formEmail.errors.password}
        />
        <Button
          text={data.button.changeEmail}
          onClick={formEmail.handleSubmit}
          disabled={
            !Object.values(formEmail.formData).every(
              (val) => val.trim() !== ""
            ) || Object.values(formEmail.errors).some((err) => !!err)
          }
        />
      </Form>
      <hr className="settingsDivider" />
      <Form>
        <FieldPassword
          text={data.changePassword.textOldPassword}
          name={data.name.oldPassword}
          onChange={formPassword.handleChange}
          value={formPassword.formData.oldPassword}
          error={formPassword.errors.oldPassword}
        />
        <FieldPassword
          text={data.changePassword.textNewPassword}
          name={data.name.newPassword}
          onChange={formPassword.handleChange}
          value={formPassword.formData.newPassword}
          error={formPassword.errors.newPassword}
        />
        <Button
          text={data.button.changePassword}
          onClick={formPassword.handleSubmit}
          disabled={
            !Object.values(formPassword.formData).every(
              (val) => val.trim() !== ""
            ) || Object.values(formPassword.errors).some((err) => !!err)
          }
        />
      </Form>
      <hr className="settingsDivider" />
      <Button variant="outline-red" text={data.button.logOut} />
    </Page>
  );
}

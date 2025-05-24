const fieldCode = {
  text: "Code",
  name: "code",
  placeholderCode: "Enter code",
  placeholderSum: "Enter sum",
};
const formData = {
  email: "email",
  password: "password",
};
const oldPassword = {
  text: "Old password",
  name: "oldPassword",
};
const newPassword = {
  text: "New password",
  name: "newPassword",
};
const buttons = {
  RestorePassword: "Restore password",
  Continue: "Continue",
  Confirm: "Confirm",
  SaveEmail: "Save Email",
  SavePassword: "Save password",
  SendTransfer: "Make a transfer",
};

// =======================================================

export const RecoveryData = {
  name: formData,
  button: buttons,
};
export const RecoveryConfirmFormData = {
  fieldCode: fieldCode,
  fieldPassword: newPassword,
  button: buttons,
};
export const SigninFormData = {
  button: buttons,
  name: formData,
  link: {
    text: "Forgot your password?",
    textLink: "Restore",
    link: "/recovery",
  },
};
export const SignupConfirmFormData = {
  fieldCode: fieldCode,
  button: buttons,
};
export const SignupFormData = {
  name: formData,
  link: {
    text: "Already have an account? ",
    textLink: "Sign In",
    link: "/signin",
  },
  button: buttons,
};
export const UpdateEmailFormData = {
  name: formData,
  textOldPassword: oldPassword,
  button: buttons,
};
export const UpdatePasswordFormData = {
  textOldPassword: oldPassword,
  textNewPassword: newPassword,
  button: buttons,
};
export const PaymentButtonsData = {
  payment: {
    title: "Payment system",
    textStripe: "Stripe",
    textCoinbase: "Coinbase",
  },
};
export const PaymentFormData = {
  title: "Receive amount",
  name: "sum",
  placeholder: fieldCode,
};
export const FormSendData = {
  text: "Sum",
  name: "sum",
  placeholder: fieldCode,
  emailName: formData,
  button: buttons,
};

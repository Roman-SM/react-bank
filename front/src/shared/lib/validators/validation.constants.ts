// Regular expression to validate email
export const REG_EXP_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

// Regular expression to validate password
export const REG_EXP_PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// Regular expression to validate code
export const REG_EXP_CODE = /^\d{4}$/;

export const FieldError = {
  isEmail: "Enter your email",
  isPassword: "Enter your password",
  email: "Invalid email address",
  password:
    "Password must be at least 8 characters long and include one digit, one lowercase letter, and one uppercase letter",
  isBig: "Maximum length exceeded",
  isSmall: "Please enter the minimum amount",
  negativeSum: "The amount cannot be negative",
  zeroSum: "The amount cannot be zero",
  negativeCode: "Please enter a numeric value.",
};

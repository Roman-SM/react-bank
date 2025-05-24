import {
  REG_EXP_EMAIL,
  FieldError,
  REG_EXP_PASSWORD,
  REG_EXP_CODE,
} from "./validation.constants";

export const validateField = (
  name: string,
  value: string
): string | undefined => {
  switch (name) {
    case "email":
      if (String(value).length < 1) return FieldError.isEmail;
      if (String(value).length > 40) return FieldError.isBig;
      if (!REG_EXP_EMAIL.test(value)) return FieldError.email;
      break;
    case "password":
      if (String(value).length < 1) return FieldError.isPassword;
      if (String(value).length > 20) return FieldError.isBig;
      if (!REG_EXP_PASSWORD.test(value)) return FieldError.password;
      break;
    case "newPassword":
      if (String(value).length < 1) return FieldError.isPassword;
      if (String(value).length > 20) return FieldError.isBig;
      if (!REG_EXP_PASSWORD.test(value)) return FieldError.password;
      break;
    case "code":
      if (String(value).length < 1) return FieldError.isSmall;
      if (!REG_EXP_CODE.test(value)) return FieldError.negativeCode;
      if (String(value).length > 20) return FieldError.isBig;
      break;
    case "sum":
      if (String(value).length < 1) return FieldError.isSmall;
      if (Number(value) === 0) return FieldError.zeroSum;
      if (Number(value) < 1) return FieldError.negativeSum;
      if (String(value).length > 20) return FieldError.isBig;
      break;
  }
  return undefined;
};

import { useState } from "react";

// Regular expression to validate email
const REG_EXP_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

// Regular expression to validate password
const REG_EXP_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const FieldError = {
  isEmail: "Enter your email",
  isPassword: "Enter your password",
  email: "Invalid email address",
  password:
    "Password must be at least 8 characters long and include one digit, one lowercase letter, and one uppercase letter",
  isBig: "Maximum length exceeded",
};

const validateField = (
  name: string,
  value: string,
  allValues?: Record<string, string>
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

    case "oldPassword":
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
      if (String(value).length < 1) return FieldError.isPassword;
      if (String(value).length > 10) return FieldError.isBig;
      break;
  }

  return undefined;
};

export const Validate = <T extends Record<string, string>>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (name: string, value: string) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const error = validateField(name as string, value, updatedFormData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<T> = {};

    for (const key in formData) {
      const fieldKey = key as keyof T;
      const error = validateField(key, formData[key], formData);
      if (error) newErrors[fieldKey] = error as T[keyof T];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      console.log("Успішно:", formData);
      setFormData(initialState);
      setErrors({});
    }
  };
  const handleSubmitNoValidate = () => {
    console.log("Успішно:", formData);
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleSubmitNoValidate,
  };
};

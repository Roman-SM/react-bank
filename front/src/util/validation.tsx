import { useAuth } from "./useAuth";
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

    case "newPassword":
      if (String(value).length < 1) return FieldError.isPassword;
      if (String(value).length > 20) return FieldError.isBig;
      if (!REG_EXP_PASSWORD.test(value)) return FieldError.password;
      break;
    case "code":
      if (String(value).length < 1) return FieldError.isPassword;
      if (String(value).length > 20) return FieldError.isBig;
      break;
  }

  return undefined;
};

export const useValidate = <T extends Record<string, string>>(
  initialState: T
) => {
  const { dispatches } = useAuth();
  // useState for update value input
  const [formData, setFormData] = useState<T>(initialState);
  // useState for update errors input
  const [errors, setErrors] = useState<Partial<T>>({});
  const [message, setMessage] = useState("");
  // update value input
  const handleChange = (name: string, value: string) => {
    // update
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    // name as string - це примусове призначення типу string для name
    const error = validateField(name as string, value, updatedFormData);
    // prev - previous state value
    // ...prev - copy of the previous errors object
    // [name]: error - update the error for the field named name
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  // validation check
  const validateAll = (): boolean => {
    // a newErrors object is created to store form field errors
    // Partial<T> means that not all fields are required
    const newErrors: Partial<T> = {};
    // iteration over the form fields
    for (const key in formData) {
      // assigning the type T to the key
      const fieldKey = key as keyof T;
      // calling the validation function for each field
      const error = validateField(key, formData[key], formData);
      // if there's an error, we store it in the newErrors object under the corresponding key
      if (error) newErrors[fieldKey] = error as T[keyof T];
    }
    // store the errors in the useState state to display them in the UI
    setErrors(newErrors);
    // if all fields are valid → return true, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatches({ type: "LOGOUT" });
  };

  return {
    formData,
    handleLogout,
    errors,
    message,
    validateAll,
    setMessage,
    setFormData,
    setErrors,
    resetForm,
    initialState,
    handleChange,
  };
};

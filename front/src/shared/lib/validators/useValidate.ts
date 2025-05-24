import { useState } from "react";
import { validateField } from "./validateField";

export const useValidate = <T extends Record<string, string>>(
  initialState: T
) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (name: string, value: string) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  const validateAll = (): boolean => {
    const newErrors: Partial<T> = {};
    for (const key in formData) {
      const fieldKey = key as keyof T;
      const error = validateField(key, formData[key]);
      if (error) newErrors[fieldKey] = error as T[keyof T];
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    validateAll,
    resetForm,
    handleChange,
  };
};

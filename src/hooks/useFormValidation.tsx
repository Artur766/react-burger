import React, { ChangeEvent } from "react";

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export function useFormValidation(initialValues = {}) {
  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isValid, setIsValid] = React.useState<boolean>(false);

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    const { name, value, validationMessage, form } = ev.target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
    setErrors((oldErroes) => ({ ...oldErroes, [name]: validationMessage }));
    if (form !== null) {
      setIsValid(form.checkValidity());
    }
  }

  const reset = React.useCallback((initialValues = {}) => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  function setValue<T extends string>(name: T, value: T) {
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  }

  return { values, errors, isValid, handleChange, setValue, reset, setIsValid, setErrors }
}
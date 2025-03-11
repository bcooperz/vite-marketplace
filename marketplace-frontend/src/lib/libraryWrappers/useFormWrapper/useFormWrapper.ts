import {
  type FieldValues,
  useForm,
  type UseFormProps,
  type UseFormRegister,
} from "react-hook-form";
import type { UseFormRegisterParams, UseFormRegisterReturnValues } from "./types";

const useFormWrapper = <T extends FieldValues>(formParams: UseFormProps<T>) => {
  const { control, handleSubmit, formState, register } = useForm<T>({ ...formParams });

  const registerInput: UseFormRegister<T> = (name, rules) => {
    const required = !!rules?.required;
    // Returns required so input can add required attribute
    return {
      ...register(name, {
        ...rules,
        required: { value: required, message: `Field is required` },
      }),
      required,
      errorMessage: formState.errors[name]?.message,
    };
  };

  const registerSelect = (
    ...[name, rules, placeholder]: UseFormRegisterParams<T>
  ): UseFormRegisterReturnValues<T> => {
    const required = !!rules?.required;

    return {
      ...register(name, { ...rules, required: { value: required, message: `Field is required` } }),
      // todo: remove this as it will cause browser validation to interfere with react hook form?
      required,
      // todo: why is this causing error without casting?
      errorMessage: formState.errors[name]?.message as string,
    };
  };

  return { control, handleSubmit, formState, register, registerInput };
};

export default useFormWrapper;

import {
  type FieldValues,
  useForm,
  type UseFormProps,
  type UseFormRegister,
  get,
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
      errorMessage: get(formState.errors, name)?.message,
      required: !!rules?.required,
    };
  };

  const registerSelect = (
    ...[name, rules, title]: UseFormRegisterParams<T>
  ): UseFormRegisterReturnValues<T> => {
    const required = !!rules?.required;

    return {
      ...register(name, {
        ...rules,
        required: { value: required, message: `${title} is required` },
      }),
      // todo: better way to get message?
      errorMessage: get(formState.errors, name)?.message?.toString(),
      title,
      required,
    };
  };

  return { control, handleSubmit, formState, register, registerInput, registerSelect };
};

export default useFormWrapper;

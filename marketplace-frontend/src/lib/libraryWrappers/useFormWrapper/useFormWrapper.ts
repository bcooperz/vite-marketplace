import {
  type FieldValues,
  useForm,
  type UseFormProps,
  type UseFormRegister,
} from "react-hook-form";
import type { UseFormRegisterParams, UseFormRegisterReturnValues } from "./types";

/*
  TODO: MOVE TO UTILs otherwise this hook would likely introduce unused logic every time it's called
*/

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
      errorMessage: formState.errors[name]?.message,
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
      // todo: better way to do this?
      errorMessage: formState.errors[name]?.message?.toString(),
      title,
    };
  };

  return { control, handleSubmit, formState, register, registerInput, registerSelect };
};

export default useFormWrapper;

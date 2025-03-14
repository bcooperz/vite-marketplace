import {
  type FieldValues,
  useForm,
  type UseFormProps,
  type UseFormRegister,
  get,
} from "react-hook-form";
import type { UseFormRegisterParams, UseFormRegisterReturnValues } from "./types";

/*
  TODO: MOVE TO UTILs otherwise this hook would likely introduce unused logic every time it's called
*/

const useFormWrapper = <T extends FieldValues>(formParams: UseFormProps<T>) => {
  const { control, handleSubmit, formState, register } = useForm<T>({ ...formParams });

  console.log("formState.errors", formState.errors);

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

    console.log("name", name);
    console.log("formState.errors[name]", formState.errors[name]);

    return {
      ...register(name, {
        ...rules,
        required: { value: required, message: `${title} is required` },
      }),
      // todo: better way to do this?
      errorMessage: get(formState.errors, name)?.message?.toString(),
      title,
      required: !!rules?.required,
    };
  };

  return { control, handleSubmit, formState, register, registerInput, registerSelect };
};

export default useFormWrapper;

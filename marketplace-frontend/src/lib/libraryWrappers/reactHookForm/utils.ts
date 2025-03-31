import type {
  UseFormRegisterParams,
  UseFormRegisterReturnValues,
} from "@/lib/libraryWrappers/reactHookForm/useFormWrapper/types";
import type { FieldErrors } from "react-hook-form";
import { get, type FieldValues, type FormState, type UseFormRegister } from "react-hook-form";

// todo: should be hook?
const getRegisterInputFn = <T extends FieldValues>({
  register,
  formState,
}: {
  register: UseFormRegister<T>;
  formState: FormState<T>;
}) => {
  // Return function where you pass details only relevant to specific input being registered
  const registerInput: UseFormRegister<T> = (name, rules) => {
    const required = !!rules?.required;

    return {
      ...register(name, {
        ...rules,
        required: { value: required, message: `Field is required` },
      }),
      errorMessage: get(formState.errors, name)?.message,
      required: !!rules?.required,
    };
  };

  return registerInput;
};

const getRegisterSelectFn = <T extends FieldValues>({
  register,
  errors,
}: {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}) => {
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
      errorMessage: get(errors, name)?.message?.toString(),
      title,
      required,
    };
  };

  return registerSelect;
};

export { getRegisterInputFn, getRegisterSelectFn };

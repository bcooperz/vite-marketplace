import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type UseFormRegisterReturnValues<T extends FieldValues> = ReturnType<UseFormRegister<T>> & {
  errorMessage?: FieldError["message"];
};

export type UseFormRegisterParams<T extends FieldValues> = [
  ...Parameters<UseFormRegister<T>>,
  placeholder?: string,
];

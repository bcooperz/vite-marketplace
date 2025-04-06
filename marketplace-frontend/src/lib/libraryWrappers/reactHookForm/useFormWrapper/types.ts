import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export type UseFormRegisterReturnValues<T extends FieldValues> = ReturnType<UseFormRegister<T>> & {
  errorMessage?: string;
  title?: string;
};

export type UseFormRegisterParams<T extends FieldValues> = [
  ...Parameters<UseFormRegister<T>>,
  title?: string,
  errorMessagePath?: Path<T>,
];

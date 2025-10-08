import ServerValidationError from "@/errors/classes/ServerValidationError";
import type { ApiErrors } from "@/errors/types";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const handleRHFError = <ErrorPaths extends FieldValues = Record<string, string>>(
  error: ApiErrors<ErrorPaths, { path: Path<ErrorPaths>; message: string }>,
  setError: UseFormSetError<ErrorPaths>,
) => {
  // todo: add error handling for other errors and move this to a reusable function
  if (error instanceof ServerValidationError) {
    error.errors.forEach((error) => {
      setError(error.path, { message: error.message, type: "manual" }, { shouldFocus: true });
    });
    error.errors.forEach((error) => {
      console.log("key", error.path);
      console.log("value", error.message);
      setError(error.path, { message: error.message, type: "manual" }, { shouldFocus: true });
    });
  } else {
    setError("root", { message: error.message, type: "manual" });
  }
};

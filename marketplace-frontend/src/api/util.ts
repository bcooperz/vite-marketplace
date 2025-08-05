import ServerValidationError from "@/errors/classes/ServerValidationError";
import type { UseFormSetError } from "react-hook-form";
import type { ApiErrors } from "@/errors/types";

export const handleRHFError = (error: ApiErrors, setError: UseFormSetError<any>) => {
  // todo: add error handling for other errors and move this to a reusable function
  if (error instanceof ServerValidationError) {
    // todo: also focus input w/ error
    // todo: create shared type for error object?
    error.errors.forEach((error: { path: string; message: string }) => {
      console.log("key", error.path);
      console.log("value", error.message);
      setError(error.path, { message: error.message, type: "manual" }, { shouldFocus: true });
    });
  } else {
    setError("root", { message: error.message, type: "manual" });
  }
};

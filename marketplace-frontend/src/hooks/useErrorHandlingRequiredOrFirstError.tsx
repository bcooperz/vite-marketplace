import type { FieldErrors } from "react-hook-form";

const useErrorHandlingRequiredOrFirstError = (errors: FieldErrors) => {
  const inputWithRequiredError = Object.values(errors ?? {}).find(
    (error) => error?.type === "required",
  );

  if (inputWithRequiredError) {
    const errorMessage = inputWithRequiredError.message;
    if (typeof errorMessage === "string") {
      return { errorMessage };
    }

    return { errorMessage: undefined };
  }

  const [firstError] = Object.values(errors ?? {});
  const firstErrorDetails = firstError ?? {};

  const errorMessage =
    typeof firstErrorDetails?.message === "string" ? firstErrorDetails.message : undefined;

  return { errorMessage };
};

export default useErrorHandlingRequiredOrFirstError;

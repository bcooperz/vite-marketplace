import DOBInput from "@/components/DOBInput/DOBInput";
import { requiredErrorId } from "@/lib/libraryWrappers/reactHookForm/constants";
import { getRegisterSelectFn } from "@/lib/libraryWrappers/reactHookForm/utils";
import type { Control, FieldError, FieldErrors } from "react-hook-form";
import { get, useWatch, type FieldValues, type Path, type UseFormRegister } from "react-hook-form";

const dayId = "day";
const monthId = "month";
const yearId = "year";

interface Props<T extends FieldValues> {
  // todo: how could I create a type which enforces a path from a certain point e.g. dob.X
  register: UseFormRegister<T>;
  dayPath: Path<T>;
  monthPath: Path<T>;
  yearPath: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

const RHFDOBInput = <T extends FieldValues>({
  errors,
  register,
  control,
  dayPath,
  monthPath,
  yearPath,
}: Props<T>) => {
  const registerSelect = getRegisterSelectFn({ errors, register });
  const selectedDay = useWatch({ control, name: dayPath });
  const selectedMonth = useWatch({ control, name: monthPath });
  const selectedYear = useWatch({ control, name: yearPath });

  const [firstError] = Object.entries(errors ?? {});
  const [firstErrorPath, firstErrorDetails] = firstError ?? [];

  const hasInputWithRequiredError = Object.values(errors ?? {}).some(
    (error) => error?.type === "required",
  );

  // todo: all inputs with required error should link to errormessage element otherwise
  //       only if the input is the first error
  const getErrorMessageElementId = (inputId: string) => {
    let inputPath;
    switch (inputId) {
      case dayId:
        inputPath = dayPath;
        break;
      case monthId:
        inputPath = monthPath;
        break;
      case yearId:
        inputPath = yearPath;
        break;
    }

    const error = get(errors, inputPath) as FieldError | undefined;

    if (error) {
      if (error.type === "required") {
        return requiredErrorId;
      }

      // todo: better way to do this? don't want to continue if any other input has required error as that takes priority
      if (hasInputWithRequiredError) {
        return undefined;
      }

      console.log("firstErrorPath", firstErrorPath);
      console.log("inputPath", inputPath);

      if (firstErrorPath === inputPath) {
        return `${inputPath}-error-id`;
      }
    }

    return undefined;
  };

  return (
    <DOBInput
      dayProps={{ ...registerSelect(dayPath, { required: true }, "Day"), id: dayId }}
      monthProps={{ ...registerSelect(monthPath, { required: true }, "Month"), id: monthId }}
      yearProps={{ ...registerSelect(yearPath, { required: true }, "Year"), id: yearId }}
      selectedDay={selectedDay}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      errorInputId={hasInputWithRequiredError ? requiredErrorId : firstErrorPath}
      errorMessageToDisplay={
        typeof firstErrorDetails?.message === "string" ? firstErrorDetails?.message : undefined
      }
      getErrorMessageElementId={getErrorMessageElementId}
    />
  );
};

export default RHFDOBInput;

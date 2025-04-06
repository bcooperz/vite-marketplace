import DOBInput from "@/components/DOBInput/DOBInput";
import { requiredErrorId } from "@/lib/libraryWrappers/reactHookForm/constants";
import { getRegisterSelectFn } from "@/lib/libraryWrappers/reactHookForm/utils";
import type { Control, FieldError, FieldErrors, FieldPath } from "react-hook-form";
import { get, useWatch, type FieldValues, type Path, type UseFormRegister } from "react-hook-form";

const dayId = "day";
const monthId = "month";
const yearId = "year";

// todo: How can I not have to duplicate the interface generic types?

interface Props<
  FValues extends FieldValues,
  DOBPath extends FieldPath<FValues>,
  SubPath extends FieldPath<FValues[DOBPath]>,
> {
  register: UseFormRegister<FValues>;
  dobPath: DOBPath;
  dayPath: SubPath;
  monthPath: SubPath;
  yearPath: SubPath;
  control: Control<FValues>;
  errors?: FieldErrors<FValues[DOBPath]>;
}

const RHFDOBInput = <
  FValues extends FieldValues,
  DOBPath extends FieldPath<FValues>,
  SubPath extends FieldPath<FValues[DOBPath]>,
>({
  errors,
  register,
  control,
  dobPath,
  dayPath,
  monthPath,
  yearPath,
}: Props<FValues, DOBPath, SubPath>) => {
  const getInputPath = (subPath: SubPath) => {
    return `${dobPath}.${subPath}` as Path<FValues>;
  };
  const fullDayPath = getInputPath(dayPath);
  const fullMonthPath = getInputPath(monthPath);
  const fullYearPath = getInputPath(yearPath);

  const registerSelect = getRegisterSelectFn({ errors, register });
  const selectedDay = useWatch({ control, name: fullDayPath });
  const selectedMonth = useWatch({ control, name: fullMonthPath });
  const selectedYear = useWatch({ control, name: fullYearPath });

  const [firstError] = Object.entries(errors ?? {});
  const [firstErrorPath, firstErrorDetails] = firstError ?? [];

  const inputWithRequiredError = Object.values(errors ?? {}).find(
    (error) => error?.type === "required",
  );

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

    if (!inputPath) return undefined;

    const error = get(errors, inputPath) as FieldError | undefined;
    if (!error) return undefined;

    if (error.type === "required") {
      return requiredErrorId;
    }

    // Other input has required error so we don't want this one to point to any error element
    if (inputWithRequiredError) {
      return undefined;
    }

    if (firstErrorPath === getInputPath(inputPath)) {
      return `${inputPath}-error-id`;
    }

    return undefined;
  };

  const errorMessage =
    typeof inputWithRequiredError?.message === "string"
      ? inputWithRequiredError.message
      : typeof firstErrorDetails?.message === "string"
        ? firstErrorDetails?.message
        : undefined;

  return (
    <DOBInput
      dayProps={{
        ...registerSelect(fullDayPath, { required: true }, "Day"),
        id: dayId,
      }}
      monthProps={{
        ...registerSelect(fullMonthPath, { required: true }, "Month"),
        id: monthId,
      }}
      yearProps={{ ...registerSelect(fullYearPath, { required: true }, "Year"), id: yearId }}
      selectedDay={selectedDay}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      errorInputId={inputWithRequiredError ? requiredErrorId : firstErrorPath}
      errorMessageToDisplay={
        errorMessage
        // typeof firstErrorDetails?.message === "string" ? firstErrorDetails?.message : undefined
      }
      getErrorMessageElementId={getErrorMessageElementId}
    />
  );
};

export default RHFDOBInput;

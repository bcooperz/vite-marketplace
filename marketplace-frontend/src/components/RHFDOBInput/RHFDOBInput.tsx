import DOBInput from "@/components/DOBInput/DOBInput";
import { getRegisterSelectFn } from "@/lib/libraryWrappers/reactHookForm/utils";
import type { Control } from "react-hook-form";
import {
  useWatch,
  type FieldValues,
  type FormState,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  formState: FormState<T>;
  register: UseFormRegister<T>;
  dayPath: Path<T>;
  monthPath: Path<T>;
  yearPath: Path<T>;
  control: Control<T>;
}

const RHFDOBInput = <T extends FieldValues>({
  formState,
  register,
  control,
  dayPath,
  monthPath,
  yearPath,
}: Props<T>) => {
  const registerSelect = getRegisterSelectFn({ formState, register });
  const selectedDay = useWatch({ control, name: dayPath });
  const selectedMonth = useWatch({ control, name: monthPath });
  const selectedYear = useWatch({ control, name: yearPath });

  return (
    <DOBInput
      dayProps={registerSelect(dayPath, { required: true }, "Day")}
      monthProps={registerSelect(monthPath, { required: true }, "Month")}
      yearProps={registerSelect(yearPath, { required: true }, "Year")}
      selectedDay={selectedDay}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
    />
  );
};

export default RHFDOBInput;

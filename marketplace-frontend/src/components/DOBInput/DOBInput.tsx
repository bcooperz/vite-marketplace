import RequiredAsterisk from "@/components/RequiredAsterisk";
import SelectInput from "@/components/SelectInput";
import sharedClasses from "@/pages/App/App.module.css";
import classes from "@/components/DOBInput/DOBInput.module.css";
import { createDayOptionElements, createYearOptionElements } from "@/pages/Register/util";
import OptionPlaceholder from "@/components/SelectInput/OptionPlaceholder";
import type { DetailedHTMLProps, Ref } from "react";

interface SelectProps
  extends DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  ref: Ref<HTMLSelectElement>;
  id: string;
}

const DOBInput = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  dayProps,
  monthProps,
  yearProps,
  errorMessageToDisplay,
  getErrorMessageElementId,
  // getErrorMessageForInput,
  errorInputId,
}: {
  selectedMonth: string;
  selectedDay: string;
  selectedYear: string;
  dayProps: SelectProps;
  monthProps: SelectProps;
  yearProps: SelectProps;
  errorMessageToDisplay?: string;
  errorInputId?: string;
  getErrorMessageElementId: (inputId: string) => string | undefined;
  // getErrorMessageForInput: (selectPath: string) => string | undefined;
}) => {
  const dayOptions = createDayOptionElements(Number(selectedMonth) || 1);
  const yearOptions = createYearOptionElements();

  // let errorId: string | undefined;

  // if (errorInputId === "requiredErrorId") {
  //   errorId = "requiredErrorId";
  // } else if (errorId !== undefined) {
  //   errorId = `${errorInputId}-error-id`;
  // }

  console.log("errorInputId", errorInputId);

  // todo: pass id prop

  return (
    <div className={`${sharedClasses.columnSpan2} ${classes.dobContainer}`}>
      <label htmlFor="months" className={sharedClasses.inputLabel}>
        Date of Birth
        <RequiredAsterisk />
      </label>
      <div className={classes.dobSelectsContainer}>
        <SelectInput
          // id="months"
          placeholder="Month"
          className={`${classes.dobSelectMonth}`}
          value={selectedMonth}
          aria-errormessage={getErrorMessageElementId(monthProps.id)}
          {...monthProps}
        >
          <>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </>
        </SelectInput>
        <SelectInput
          // id="day"
          className={`${classes.dobSelectDay}`}
          placeholder="Day"
          value={selectedDay}
          // todo: better way to do this? -- do inside SelectInput?
          aria-errormessage={getErrorMessageElementId(dayProps.id)}
          {...dayProps}
        >
          {dayOptions}
        </SelectInput>
        <SelectInput
          // id="year"
          placeholder="Year"
          className={`${classes.dobSelectYear}`}
          value={selectedYear}
          aria-errormessage={getErrorMessageElementId(yearProps.id)}
          {...yearProps}
        >
          <OptionPlaceholder>Year</OptionPlaceholder>
          {yearOptions}
        </SelectInput>
      </div>
      {errorMessageToDisplay && (
        <div id={errorInputId} aria-live="assertive" className={sharedClasses.errorMessage}>
          {errorMessageToDisplay}
        </div>
      )}
    </div>
  );
};

export default DOBInput;

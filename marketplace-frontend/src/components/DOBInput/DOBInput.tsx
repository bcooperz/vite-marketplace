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
}

// todo: What should this type be? - should paths be passed?
// pass input props for each instead
// compose this with RHF component
const DOBInput = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  dayProps,
  monthProps,
  yearProps,
}: {
  selectedMonth: string;
  selectedDay: string;
  selectedYear: string;
  dayProps: SelectProps;
  monthProps: SelectProps;
  yearProps: SelectProps;
}) => {
  const dayOptions = createDayOptionElements(Number(selectedMonth) || 1);
  const yearOptions = createYearOptionElements();

  return (
    <div className={sharedClasses.columnSpan2}>
      <label htmlFor="months" className={sharedClasses.inputLabel}>
        Date of Birth
        <RequiredAsterisk />
      </label>
      <div className={classes.dobSelectsContainer}>
        <SelectInput
          id="months"
          placeholder="Month"
          className={`${classes.dobSelectMonth}`}
          value={selectedMonth}
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
          id="day"
          className={`${classes.dobSelectDay}`}
          placeholder="Day"
          value={selectedDay}
          {...dayProps}
        >
          {dayOptions}
        </SelectInput>
        <SelectInput
          id="year"
          placeholder="Year"
          className={`${classes.dobSelectYear}`}
          value={selectedYear}
          {...yearProps}
        >
          <OptionPlaceholder>Year</OptionPlaceholder>
          {yearOptions}
        </SelectInput>
      </div>
      {/* todo: add DOB is required */}
    </div>
  );
};

export default DOBInput;

import type { ReactNode } from "react";

export function createYearOptionElements() {
  const startYear = new Date().getFullYear() - 5;
  const yearsToInclude = 120;

  const yearOptions: ReactNode[] = [];

  for (let i = 0; i <= yearsToInclude; i++) {
    const year = startYear - i;
    yearOptions.push(
      <option key={`year${year}`} value={`year${year}`}>
        {year}
      </option>,
    );
  }

  return yearOptions;
}

export function createDayOptionElements(selectedMonth: number) {
  const year = new Date().getFullYear();
  const daysInMonthNumber = new Date(year, selectedMonth, 0).getDate();

  const result: ReactNode[] = [];
  for (let i = 1; i <= daysInMonthNumber; i++) {
    result.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return result;
}

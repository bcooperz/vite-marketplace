import type { DetailedHTMLProps, Ref } from "react";
import OptionPlaceholder from "./OptionPlaceholder";

interface Props
  extends DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  placeholder?: string;
  errorMessage?: string;
  ref: Ref<HTMLSelectElement>;
}

{
  /* todo: add error message logic, accessibility and styling -- see FormInput*/
}
const SelectInput = ({
  id,
  children,
  placeholder,
  required,
  errorMessage,
  ref,
  ...rest
}: Props) => {
  const invalid = errorMessage !== undefined;

  // todo: add described by / error message for DOB input -- create component?
  const errorMessageId = `${id}-error`;

  return (
    <select ref={ref} {...rest} aria-invalid={invalid} aria-required={required} id={id}>
      {placeholder && <OptionPlaceholder>{placeholder}</OptionPlaceholder>}
      {children}
    </select>
  );
};

export default SelectInput;

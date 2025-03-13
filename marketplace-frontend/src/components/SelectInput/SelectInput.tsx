import type { DetailedHTMLProps, Ref } from "react";
import OptionPlaceholder from "./OptionPlaceholder";

interface Props
  extends DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  placeholder?: string;
  ref: Ref<HTMLSelectElement>;
}

{
  /* todo: add error message logic and styling -- see FormInput*/
}
const SelectInput = ({ children, placeholder, ref, ...rest }: Props) => {
  return (
    <select ref={ref} {...rest}>
      {placeholder && <OptionPlaceholder>{placeholder}</OptionPlaceholder>}
      {children}
    </select>
  );
};

export default SelectInput;

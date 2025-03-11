import type { DetailedHTMLProps, FC, ReactNode, Ref } from "react";

interface Props
  extends DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: ReactNode;
  PlaceholderOption?: FC;
  ref: Ref<HTMLSelectElement>;
}

const SelectInput = ({ options, PlaceholderOption, ref, ...rest }: Props) => {
  return (
    <select ref={ref} {...rest}>
      {options}
    </select>
  );
};

export default SelectInput;

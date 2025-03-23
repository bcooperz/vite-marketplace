import OptionPlaceholder from "@/components/SelectInput/OptionPlaceholder";
import type { Props } from "@/components/SelectInput/types";

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

  return (
    <select ref={ref} {...rest} aria-invalid={invalid} aria-required={required} id={id}>
      {placeholder && <OptionPlaceholder>{placeholder}</OptionPlaceholder>}
      {children}
    </select>
  );
};

export default SelectInput;

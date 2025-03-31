import RequiredAsterisk from "@/components/RequiredAsterisk";
import classes from "./SelectInputWithLabel.module.css";
import sharedClasses from "@/pages/App/App.module.css";
import type { Props as SelectInputProps } from "@/components/SelectInput/types";
import SelectInput from "@/components/SelectInput/SelectInput";

interface Props extends SelectInputProps {
  /* todo: add error message logic, accessibility and styling -- see FormInput*/
}

const SelectInputWithLabel = ({
  id,
  children,
  placeholder,
  required,
  errorMessage,
  ref,
  ...rest
}: Props) => {
  console.log("error message", errorMessage);
  const invalid = errorMessage !== undefined;
  console.log("invalid", invalid);
  const errorMessageId = `${id}-error`;

  return (
    <div className={classes.inputContainer}>
      <label className={sharedClasses.inputLabel} htmlFor={id}>
        {placeholder}
        {required && <RequiredAsterisk />}
      </label>
      <SelectInput
        id={id}
        placeholder={placeholder}
        errorMessage={errorMessage}
        required={required}
        aria-errormessage={errorMessage ? errorMessageId : undefined}
        ref={ref}
        {...rest}
      >
        {children}
      </SelectInput>
      {errorMessage && (
        <div id={errorMessageId} aria-live="assertive" className={sharedClasses.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SelectInputWithLabel;

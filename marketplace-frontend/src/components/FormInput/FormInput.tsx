import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import classes from "@/components/FormInput/FormInput.module.css";
import sharedClasses from "@/pages/App/App.module.css";
import RequiredAsterisk from "@/components/RequiredAsterisk";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const FormInput = forwardRef<HTMLInputElement, Props>(function FormInput(
  { id, placeholder, className, required, errorMessage, ...rest },
  ref,
) {
  const invalid = errorMessage !== undefined;
  const errorMessageId = `${id}-error`;

  // todo: if time, test with screen reader
  return (
    // todo: better way of including className? -- what if it's undefined, test that case
    <div className={`${classes.inputContainer} ${className ?? ""}`}>
      <label className={sharedClasses.inputLabel} htmlFor={id}>
        {placeholder}
        {required && <RequiredAsterisk />}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className={classes.textInput}
        aria-invalid={invalid}
        aria-required={required}
        aria-errormessage={errorMessage ? errorMessageId : undefined}
        ref={ref}
        {...rest}
      />
      <div id={errorMessageId} aria-live="assertive" className={sharedClasses.errorMessage}>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    </div>
  );
});

export default FormInput;

import { forwardRef, InputHTMLAttributes } from "react";
import classes from "./FormInput.module.css";
import clsx from "clsx";

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
    <div className={`${classes.inputContainer} ${className ?? ""}`}>
      <label className={classes.inputLabel} htmlFor={id}>
        {placeholder}
        {required && (
          <span className={classes.requiredAsterisk} aria-hidden>
            {" "}
            &#42;
          </span>
        )}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className={clsx(classes.textInput, { [classes.textInputInvalid]: invalid })}
        aria-invalid={invalid}
        aria-required={required}
        aria-describedby={errorMessage ? errorMessageId : undefined}
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <div id={errorMessageId} aria-live="assertive" className={classes.errorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
});

export default FormInput;

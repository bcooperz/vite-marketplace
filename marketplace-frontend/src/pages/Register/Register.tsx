import FormInput from "@/components/FormInput";
import type { SubmitHandler } from "react-hook-form";
import { useWatch } from "react-hook-form";
import classes from "./Register.module.css";
import useFormWrapper from "@/lib/libraryWrappers/useFormWrapper/useFormWrapper";
import { createDayOptionElements, createYearOptionElements } from "./util";
import SelectInput from "@/components/SelectInput/SelectInput";
import OptionPlaceholder from "@/components/SelectInput/OptionPlaceholder";

/*
 TODOs
  - Loading state
  - make registration work and save token to DB / start a session
  - create login
  ==- validate accessibility
  - validate security - XSS, CSRF
  - Add error handling
  - Add unit and e2e tests
  - Add form validation

  - Later?
  - Redo without hook form and add validation?
  - = and use a different approach to styling / CSS-in-JS, Sass, styled components, tailwind
  - Add CSS preprocessor
  - Consider performance impact of CSS - can cache? lazy load?
*/

/*
  todo:
    Error handling todo
     ==- Make required red border
     ==- Add error messages
     ==- Ensure accessibility
     ==- Ensure user can scroll
     ==- Ensure user can tab 
     - Display for server errors

  */

interface ViewModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
}

const Register = ({ onSuccessHandler }: { onSuccessHandler?: () => void }) => {
  const submitHandler: SubmitHandler<ViewModel> = async (values) => {
    // call register api and callback function to allow parent to redirect or close modal etc
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onSuccessHandler?.();
    console.log(values);
  };

  const {
    register,
    registerInput,
    registerSelect,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useFormWrapper<ViewModel>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      dob: {
        day: "",
        month: "",
        year: "",
      },
    },
  });

  const selectedMonth = useWatch({ control, name: "dob.month" });
  const dayOptions = createDayOptionElements(Number(selectedMonth) || 1);
  const yearOptions = createYearOptionElements();

  return (
    <div>
      <h2>Register</h2>
      {isSubmitting && "Loading..."}
      <form className={classes.formContainer} onSubmit={handleSubmit(submitHandler)}>
        {/* todo: move styles to module */}
        <div className={`${classes.registerContainer}`}>
          <FormInput
            id="firstname"
            placeholder="First Name"
            {...registerInput("firstName", { required: true })}
          />
          <FormInput
            id="lastname"
            placeholder="Last Name"
            {...registerInput("lastName", { required: true })}
          />
          <FormInput
            id="username"
            placeholder="Username"
            {...registerInput("username", { required: true })}
            className={classes.columnSpan2}
          />
          {/* todo: add email validation */}
          <FormInput
            id="email"
            placeholder="Email Address"
            {...registerInput("email", { required: true })}
            className={classes.columnSpan2}
          />
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            {...registerInput("password", { required: true })}
            className={classes.columnSpan2}
          />
          <div className={classes.columnSpan2}>
            <div>Date of Birth</div>
            <div className={classes.dobSelectsContainer}>
              {/* todo: why does first month show as selected, should not hide first option? */}
              <SelectInput
                id="months"
                placeholder="Month"
                className={`${classes.dobSelectMonth}`}
                {...registerSelect("dob.month", { required: true }, "Month")}
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
                {...registerSelect("dob.day", { required: true }, "Day")}
              >
                {dayOptions}
              </SelectInput>
              <SelectInput
                id="year"
                placeholder="Year"
                className={`${classes.dobSelectYear}`}
                {...registerSelect("dob.year", { required: true }, "Year")}
              >
                <OptionPlaceholder>Year</OptionPlaceholder>
                {yearOptions}
              </SelectInput>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            handleSubmit(submitHandler);
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

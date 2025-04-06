import FormInput from "@/components/FormInput";
import type { SubmitHandler } from "react-hook-form";
import { get, useForm } from "react-hook-form";
import classes from "./Register.module.css";
import sharedClasses from "@/pages/App/App.module.css";
import { getRegisterInputFn } from "@/lib/libraryWrappers/reactHookForm/utils";
import RHFDOBInput from "@/components/RHFDOBInput/RHFDOBInput";

/*
 TODOs
  - make registration work and save token to DB / start a session 
  - Loading state
  - create login
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
     - Create DOB component
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

  const { register, handleSubmit, formState, control } = useForm<ViewModel>({
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

  const { isSubmitting } = formState;

  // todo: consider if this is the best way to register and get error messages / add functionality to input. should this be 2 hooks or separated somehow?
  const registerInput = getRegisterInputFn({ formState, register });

  return (
    <div className={classes.registerContainer}>
      <h2>Register</h2>
      {isSubmitting && "Loading..."}
      <form className={classes.formContainer} onSubmit={handleSubmit(submitHandler)}>
        {/* todo: move styles to module */}
        <div className={`${classes.registerFormContainer}`}>
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
            className={sharedClasses.columnSpan2}
          />
          {/* todo: add email validation */}
          <FormInput
            id="email"
            placeholder="Email Address"
            {...registerInput("email", { required: true })}
            className={sharedClasses.columnSpan2}
          />
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            {...registerInput("password", { required: true })}
            className={sharedClasses.columnSpan2}
          />
          <RHFDOBInput
            register={register}
            errors={formState.errors.dob}
            control={control}
            dobPath="dob"
            dayPath="day"
            monthPath="month"
            yearPath="year"
          />
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

import FormInput from "@/components/FormInput";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import classes from "./Register.module.css";
import sharedClasses from "@/pages/App/App.module.css";
import { getRegisterInputFn } from "@/lib/libraryWrappers/reactHookForm/utils";
import RHFDOBInput from "@/components/RHFDOBInput/RHFDOBInput";
import authenticationApiModules from "@/api/authenticationApiModules";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schemas";
import type z from "zod";
import { handleRHFError } from "@/api/utils/handleRHFError";

/*
 TODOs
  - create login page
  - Add toast notifications
  - validate security - XSS, CSRF
  - Add unit and e2e tests

  - Maybe Later?
  - Redo without hook form and add validation?
  - = and use a different approach to styling / CSS-in-JS, Sass, styled components, tailwind
  - Add CSS preprocessor
  - Consider performance impact of CSS - can cache? lazy load?
*/

/*
  todo:
    Error handling todo
     - Create DOB component

  */

const Register = ({ onSuccessHandler }: { onSuccessHandler?: () => void }) => {
  const { register, handleSubmit, formState, control, setError } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dob: {
        day: "",
        month: "",
        year: "",
      },
    },
    resolver: zodResolver(registerSchema),
  });

  const { isSubmitting } = formState;

  const submitHandler: SubmitHandler<z.infer<typeof registerSchema>> = async (values) => {
    // call register api and callback function to allow parent to redirect or close modal etc

    const dob = new Date(
      Number(values.dob.year),
      Number(values.dob.month),
      Number(values.dob.day),
    ).toISOString();

    if (!dob) {
      setError("dob", { message: "Invalid date of birth", type: "manual" });
      return;
    }

    // todo: test different confirm password errors
    // todo: make generic logic for error handling
    //  - react query style, onErrorCallback and call reusable function or error handling in api layer?
    //  - promise based, e.g. .then().catch()

    /* 
       - Error handling in api layer & resuasble fucntion with promise based approach?
         = then ask AI to review
      */
    const response = await authenticationApiModules.register({
      payload: {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        dob: dob,
      },
      onError: (error) => {
        // todo: consider: error works because it should be a sub type of the form values, e.g. set error with any potential dob path
        handleRHFError(error, setError);
      },
      onSuccess: (data) => {
        console.log("success in register", data);
        onSuccessHandler?.();
      },
    });
    console.log("response in register", response);
  };

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
          <FormInput
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...registerInput("confirmPassword", { required: true })}
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
        <div className={sharedClasses.errorMessage}>
          {/* todo: add server errors */}
          {formState.errors.root?.message && <p>{formState.errors.root?.message}</p>}
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

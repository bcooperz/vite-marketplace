import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";

interface ViewModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

const Login = ({ onSubmitHandler }: { onSubmitHandler?: () => void }) => {
  const submitHandler: SubmitHandler<ViewModel> = async (values) => {
    onSubmitHandler?.();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ViewModel>({ mode: "all" });

  return (
    <div style={{ width: "12rem" }}>
      <h2>Login</h2>
      {isSubmitting && "Loading"}
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* <label htmlFor="username" style={{ display: "block" }}>
          Username:{" "}
        </label> */}
        <FormInput id="username" placeholder="Username" {...register("username")} />
        {/* <input
          id="username"
          type="text"
          placeholder="Username"
          className={classes.textInput}
          {...register("username")}
        /> */}
        <button
          onClick={() => {
            console.log("submitting");
            handleSubmit(submitHandler);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

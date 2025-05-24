import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import useAuth from "@/hooks/useAuth";

interface ViewModel {
  email: string;
  password: string;
}

const Login = ({ onSubmitHandler }: { onSubmitHandler?: () => void }) => {
  const { login } = useAuth();
  const submitHandler: SubmitHandler<ViewModel> = async (values) => {
    // onSubmitHandler?.();
    const response = await login(values.email, values.password);
    console.log(response);
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
        <FormInput id="email" placeholder="Email" {...register("email")} />
        <FormInput id="password" placeholder="Password" {...register("password")} />
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

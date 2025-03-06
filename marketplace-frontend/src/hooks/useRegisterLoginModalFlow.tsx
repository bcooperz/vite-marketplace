import { useModal } from "@/context/useModal";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const useRegisterLoginModalFlow = () => {
  const { createModal } = useModal();

  const registerClickedHandler = async () => {
    // todo: consider possible errors
    // e.g. network, already existing user, invalid password etc
    try {
      const result = await createModal<boolean>((handlers) => (
        <Register
          onSuccessHandler={() => {
            handlers.handleOk(true);
          }}
        />
      ));
      console.log("result", result);
    } catch (e) {
      console.log("error", e);
    }

    console.log("opening login");

    const loginResult = await createModal<boolean>((handlers) => (
      <Login
        onSubmitHandler={() => {
          handlers.handleOk(true);
        }}
      />
    ));
    console.log("loginResult", loginResult);
  };

  const RegisterComponent = () => {
    return (
      <>
        <button style={{ cursor: "pointer" }} onClick={registerClickedHandler}>
          Register
        </button>
      </>
    );
  };

  return { RegisterComponent };
};

export default useRegisterLoginModalFlow;

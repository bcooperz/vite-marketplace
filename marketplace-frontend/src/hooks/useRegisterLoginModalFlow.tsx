import { useModal } from "@/hooks/useModal";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const useRegisterLoginModalFlow = () => {
  const { createModal } = useModal();

  const registerClickedHandler = async () => {
    // todo: consider possible errors
    // e.g. network, already existing user, invalid password etc
    try {
      // const result = await createModal<boolean>((handlers) => (
      await createModal<boolean>((handlers) => (
        <Register
          onSuccessHandler={() => {
            handlers.handleOk(true);
          }}
        />
      ));
    } catch (e) {
      console.log("error", e);
    }

    // todo: consider if handlers are needed here
    const loginResult = await createModal<boolean>(() => (
      <Login
      // onSubmitHandler={() => {
      //   handlers.handleOk(true);
      // }}
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

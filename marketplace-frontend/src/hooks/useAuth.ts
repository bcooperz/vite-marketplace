import authenticationApiModules from "@/api/authenticationApiModules";
import useAuthStore from "@/stores/authStore";

// todo: should this be global state? - zustand store?

/*
  todo:
   - How to get auth status when using session auth - session timer?
   - Redirect to login page if not authenticated - Protected route wrapper? alternatives?
   - Managing session persistence?
*/

const useAuth = () => {
  const { isAuthenticated, user, loginStore, logoutStore } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      // todo: get session expires at from response header
      const { user } = await authenticationApiModules.login({
        email,
        password,
      });
      loginStore(user, sessionExpiresAt);
    } catch (error) {
      // todo: handle error
      console.error(error);
    }
  };

  const logout = () => {
    logoutStore();
  };

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return { isAuthenticated, user, login, logout };
};

export default useAuth;

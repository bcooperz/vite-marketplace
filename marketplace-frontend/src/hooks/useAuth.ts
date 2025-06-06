import authenticationApiModules from "@/api/authenticationApiModules";
import useAuthStore from "@/stores/authStore";

/*
  todo:
   - Redirect to login page if not authenticated - Protected route wrapper? alternatives?
   - use server time to calculate session expiry time?
*/

const useAuth = () => {
  const { isAuthenticated, user, loginStore, logoutStore } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      const response = await authenticationApiModules.login({
        email,
        password,
      });
      loginStore(response.data.user, response.headers["x-session-expires-at"]);
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

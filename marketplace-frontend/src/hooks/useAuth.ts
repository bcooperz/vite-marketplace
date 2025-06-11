import authenticationApiModules from "@/api/authenticationApiModules";
import AuthService from "@/services/authService";
import useAuthStore from "@/stores/authStore";

/*
  todo:
   - Redirect to login page if not authenticated - Protected route wrapper? alternatives?
   - use server time to calculate session expiry time?
*/

const useAuth = () => {
  const { isAuthenticated, user } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      const response = await authenticationApiModules.login({
        email,
        password,
      });
      AuthService.getInstance().login({
        user: response.data.user,
        updatedAt: response.data.updatedAt,
      });
    } catch (error) {
      // todo: handle error
      console.error(error);
    }
  };

  const logout = () => {
    AuthService.getInstance().logout();
  };

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return { isAuthenticated, user, login, logout };
};

export default useAuth;

import authenticationApiModules from "@/api/authenticationApiModules";
import AuthService from "@/services/authService";
import useAuthStore from "@/stores/authStore";

/*
  todo:
   - Redirect to login page if not authenticated - Protected route wrapper? alternatives?
*/

const useAuth = () => {
  const { isAuthenticated, user } = useAuthStore();

  const login = (email: string, password: string) => {
    return authenticationApiModules.login(
      {
        email,
        password,
      },
      (error) => {
        console.log("error in login", error);
      },
      (data) => {
        console.log("data in login", data);
        AuthService.getInstance().login({
          user: data.data.user,
          updatedAt: data.data.updatedAt,
        });
      },
    );
  };

  const logout = () => {
    AuthService.getInstance().logout();
  };

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return { isAuthenticated, user, login, logout };
};

export default useAuth;

import type { User } from "@/types/user";
import { requestFn } from "./axios";

interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  updatedAt: number;
}

const authenticationApiModules = () => {
  const subPath = "/auth";

  return {
    register: (registerPayload: RegisterPayload) => {
      return requestFn({
        method: "POST",
        path: `${subPath}/register`,
        payload: registerPayload,
      });
    },
    login: (loginPayload: LoginPayload) => {
      return requestFn<LoginResponse>({
        method: "POST",
        path: `${subPath}/login`,
        payload: loginPayload,
      });
    },
    reAuthenticate: () => {
      return requestFn({
        method: "GET",
        path: `${subPath}/reAuthenticate`,
      });
    },
  };
};

const authenticationApi = authenticationApiModules();

export default authenticationApi;

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
}

const authenticationApiModules = {
  register: (registerPayload: RegisterPayload) => {
    return requestFn({
      method: "POST",
      path: "/auth/register",
      payload: registerPayload,
    });
  },
  login: (loginPayload: LoginPayload): Promise<LoginResponse> => {
    return requestFn<LoginResponse>({
      method: "POST",
      path: "/auth/login",
      payload: loginPayload,
    });
  },
};

export default authenticationApiModules;

import type {
  CreateUserPayload,
  LoginUserPayload,
} from "../../../marketplace-types/src/schemas/auth";
import { requestFn } from "./axios";
import type {
  LoginResponse,
  ReAuthenticateResponse,
  RegisterResponse,
} from "../../../marketplace-types/src/responseTypes/auth";

const authenticationApiModules = () => {
  const subPath = "/auth";

  // todo: Check all these types are correct
  return {
    register: (registerPayload: CreateUserPayload) => {
      return requestFn<RegisterResponse>({
        method: "POST",
        path: `${subPath}/register`,
        payload: registerPayload,
      });
    },
    login: (loginPayload: LoginUserPayload) => {
      return requestFn<LoginResponse>({
        method: "POST",
        path: `${subPath}/login`,
        payload: loginPayload,
      });
    },
    reAuthenticate: () => {
      return requestFn<ReAuthenticateResponse>({
        method: "GET",
        path: `${subPath}/reAuthenticate`,
      });
    },
  };
};

const authenticationApi = authenticationApiModules();

export default authenticationApi;

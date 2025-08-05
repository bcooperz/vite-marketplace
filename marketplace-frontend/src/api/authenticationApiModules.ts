import type {
  CreateUserPayload,
  LoginUserPayload,
  LoginResponse,
  ReAuthenticateResponse,
  RegisterResponse,
} from "@marketplace-types";
import { requestFn } from "./axios";
import type { ApiErrors } from "@/errors/types";
import type { AxiosResponse } from "axios";

// const withErrorHandling = <T, E = ApiErrors>(
//   promise: Promise<T>,
//   onError?: (error: E) => void,
// ): Promise<{ error: E | null; data: T | null }> => {
//   // todo: will this potentially catch errors that the caller may want to handle?
//   //       = e.g. how will a react component be able to setError in RHF?
//   return promise
//     .then((data) => {
//       return {
//         error: null,
//         data: data,
//       };
//     })
//     .catch((error: E) => {
//       onError?.(error);
//       console.error(error);
//       // todo: will this potentially catch errors that the caller may want to handle?
//       //       = e.g. how will a react component be able to setError in RHF?
//       return {
//         error: error,
//         data: null,
//       };
//     });
// };

const authenticationApiModules = () => {
  const subPath = "/auth";

  return {
    register: (
      registerPayload: CreateUserPayload,
      onError?: (error: ApiErrors) => void,
      onSuccess?: (
        data: AxiosResponse<
          // todo: create type for this
          { data: RegisterResponse; error: null } | { data: null; error: ApiErrors }
        >,
      ) => void,
    ) => {
      return requestFn<RegisterResponse>({
        method: "POST",
        path: `${subPath}/register`,
        payload: registerPayload,
        onError,
        // todo: fix
        onSuccess,
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

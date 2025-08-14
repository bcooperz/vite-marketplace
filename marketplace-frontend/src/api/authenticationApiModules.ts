import type {
  CreateUserPayload,
  LoginUserPayload,
  LoginResponse,
  ReAuthenticateResponse,
  RegisterResponse,
} from "@marketplace-types";
import { requestFn } from "./axios";
import type { ApiErrors } from "@/errors/types";
import type { RequestFnSuccessResponse } from "./types";

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
      onSuccess?: (data: RequestFnSuccessResponse<RegisterResponse>) => void,
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
    login: (
      loginPayload: LoginUserPayload,
      onError?: (error: ApiErrors) => void,
      onSuccess?: (data: RequestFnSuccessResponse<LoginResponse>) => void,
    ) => {
      return requestFn<LoginResponse>({
        method: "POST",
        path: `${subPath}/login`,
        payload: loginPayload,
        onError,
        onSuccess,
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

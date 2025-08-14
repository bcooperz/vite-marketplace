import ConflictError from "@/errors/classes/ConflictError";
import ForbiddenError from "@/errors/classes/ForbiddenError";
import GenericServerError from "@/errors/classes/GenericServerError";
import NetworkError from "@/errors/classes/NetworkError";
import NetworkTimeoutError from "@/errors/classes/NetworkTimeoutError";
import NotFoundError from "@/errors/classes/NotFoundError";
import RequestCancelledError from "@/errors/classes/RequestCancelledError";
import ServerValidationError from "@/errors/classes/ServerValidationError";
import UnauthorizedError from "@/errors/classes/UnauthorizedError";
import type { ApiErrors } from "@/errors/types";
import AuthService from "@/services/authService";
import type {
  AxiosRequestConfigWithMetadata,
  AxiosResponseWithMetadata,
  CancellablePromise,
} from "@/types/axios";
import { abortSymbol } from "@/types/axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import axios, { HttpStatusCode } from "axios";
import type { RequestFnResponseAxiosResponse, RequestFnSuccessResponse } from "./types";

// todo: add promise status codes and retry? (if i run into situation where this would be helpful)

// todo: consider what other options I should add
// cache control?
const instance = axios.create({
  timeout: 5000,
  responseType: "json",
  baseURL: "https://localhost:3000/api/",
  withCredentials: true,
});

/**
 * @throws {ApiErrors}
 * @description
 * - Creates an axios instance
 * - Adds a request interceptor to the instance
 * - Adds a response interceptor to the instance
 * - Returns the instance
 */
const requestFn = <T, R = RequestFnResponseAxiosResponse<T>>({
  method,
  path,
  payload,
  config = {},
  signal,
  onError,
  onSuccess,
}: {
  path: string;
  method: Method;
  payload?: any;
  config?: AxiosRequestConfig;
  signal?: AbortSignal;
  onError?: (error: ApiErrors) => void;
  onSuccess?: (data: RequestFnSuccessResponse<T>) => void;
}): CancellablePromise<R> => {
  const METHOD = method.toUpperCase();
  let abortController: AbortController | undefined = undefined;
  let promise: CancellablePromise<R>;

  if (!signal && !config?.signal) {
    try {
      abortController = new AbortController();
      config.signal = abortController.signal;
    } catch {
      // Oh well
    }
  }

  if (METHOD === "POST") {
    promise = instance.post(path, payload, { signal, ...config }) as CancellablePromise<R>;
  } else if (METHOD === "GET") {
    promise = instance.get(path, { signal, ...config }) as CancellablePromise<R>;
  } else if (METHOD === "PUT") {
    promise = instance.put(path, payload, { signal, ...config }) as CancellablePromise<R>;
  } else {
    // todo: any way to avoid type casting this?
    promise = axios.request({
      method,
      url: path,
      params: payload,
      ...config,
    }) as CancellablePromise<R>;
  }

  promise[abortSymbol] = abortController;

  return (
    promise
      .then((data) => {
        onSuccess?.(data as RequestFnSuccessResponse<T>);
        return {
          error: null,
          data: data,
        };
      })
      // todo: this means the caller will not be able to handle the error - is this a problem?
      .catch((error: ApiErrors) => {
        onError?.(error);
        return {
          error: error,
          data: null,
        };
      }) as CancellablePromise<R>
  );
};

instance.interceptors.request.use(
  (config: AxiosRequestConfigWithMetadata) => {
    // Do something before request is sent

    config.metadata = {
      lastUpdate: Date.now(),
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponseWithMetadata) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.config.metadata?.lastUpdate) {
      AuthService.getInstance().reAuthenticate({
        updatedAt: response.config.metadata?.lastUpdate,
      });
    }

    return response;
  },
  (error: AxiosError<ApiErrors>) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Handle network errors
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        return Promise.reject(new NetworkTimeoutError("Request timed out"));
      }
      if (error.code === "ERR_CANCELED") {
        return Promise.reject(new RequestCancelledError("Request canceled"));
      }
      return Promise.reject(new NetworkError("Network error"));
    }

    // todo: update type
    const { data, status } = error.response as AxiosResponse;

    if (data.errors) {
      // todo: consider if this is the best way to handle validation errors
      return Promise.reject(new ServerValidationError(data.message, data.errors));
    }

    // todo: should these return more than just the error message?
    switch (status) {
      case HttpStatusCode.Unauthorized: {
        AuthService.getInstance().logout();
        return Promise.reject(new UnauthorizedError(data.message ?? "Unauthorized"));
      }
      case HttpStatusCode.Forbidden: {
        return Promise.reject(new ForbiddenError(data.message ?? "Forbidden"));
      }
      case HttpStatusCode.NotFound: {
        return Promise.reject(new NotFoundError(data.message ?? "Not found"));
      }
      case HttpStatusCode.Conflict: {
        return Promise.reject(new ConflictError(data.message ?? "Conflict"));
      }
      default:
        return Promise.reject(new GenericServerError(data.message ?? "Server error"));
    }
  },
);

export { requestFn };

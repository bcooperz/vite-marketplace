import useAuthStore from "@/stores/authStore";
import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import axios from "axios";

export const abortSymbol = Symbol("abortController");

export interface CancellablePromise<T> extends Promise<T> {
  [abortSymbol]: AbortController | undefined;
}

// todo: add promise status codes and retry? (if i run into situation where this would be helpful)

// todo: consider what other options I should add
// cache control?
const instance = axios.create({
  timeout: 5000,
  responseType: "json",
  baseURL: "https://localhost:3000/api/",
  withCredentials: true,
});

const requestFn = <T, R = AxiosResponse<T>>({
  method,
  path,
  payload,
  config = {},
  signal,
}: {
  path: string;
  method: Method;
  payload?: any;
  config?: AxiosRequestConfig;
  signal?: AbortSignal;
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
    promise = axios.request({
      method,
      url: path,
      params: payload,
      ...config,
    }) as CancellablePromise<R>;
  }

  promise[abortSymbol] = abortController;

  return promise;
};

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const sessionExpiresAt = response.headers["x-session-expires-at"];
    if (sessionExpiresAt) {
      useAuthStore.getState().updateSessionExpiresAt(sessionExpiresAt);
    }

    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { requestFn };

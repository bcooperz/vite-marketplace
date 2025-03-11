import type { AxiosRequestConfig, Method } from "axios";
import axios from "axios";

export const abortSymbol = Symbol("abortController");

export interface CancellablePromise<T> extends Promise<T> {
  [abortSymbol]: AbortController | undefined;
}

const authToken = "";
// todo: add auth headers
// todo: add promise status codes and retry? (if i run into situation where this would be helpful)

const instance = axios.create({
  timeout: 5000,
  responseType: "json",
  baseURL: "http://localhost:3000/",
  headers: { common: { Authorization: authToken } },
});

const requestFn = <T>({
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
}): CancellablePromise<T> => {
  const METHOD = method.toUpperCase();
  let abortController: AbortController | undefined = undefined;
  let promise: CancellablePromise<T>;

  if (!signal && !config?.signal) {
    try {
      console.log("adding abort");
      abortController = new AbortController();
      config.signal = abortController.signal;
    } catch {
      // Oh well
    }
  }

  if (METHOD === "POST") {
    promise = instance.post(path, payload, { signal, ...config }) as CancellablePromise<T>;
  } else if (METHOD === "GET") {
    promise = instance.get(path, { signal, ...config }) as CancellablePromise<T>;
  } else if (METHOD === "PUT") {
    promise = instance.put(path, payload, { signal, ...config }) as CancellablePromise<T>;
  } else {
    promise = axios.request({
      method,
      url: path,
      params: payload,
      ...config,
    }) as CancellablePromise<T>;
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

    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { requestFn };

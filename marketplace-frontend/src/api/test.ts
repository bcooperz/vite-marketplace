import { requestFn } from "./axios";

const testApi = () => {
  return {
    getHelloWorld: (signal?: AbortSignal) => {
      return requestFn<{ message: string }>({
        signal,
        method: "GET",
        path: "",
      });
    },
  };
};

export default {
  helloWorld: { ...testApi() },
};

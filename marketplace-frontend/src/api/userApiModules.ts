import { requestFn } from "./axios";

const userApiModules = {
  getUser: () => {
    return requestFn({
      method: "GET",
      path: "/users/user",
    });
  },
};

export default userApiModules;

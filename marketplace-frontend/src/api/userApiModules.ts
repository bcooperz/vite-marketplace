import { requestFn } from "./axios";
import type { GetUserPayload } from "@marketplace-types";

const userApiModules = {
  getUser: () => {
    return requestFn<GetUserPayload>({
      method: "GET",
      path: "/users/user",
    });
  },
};

export default userApiModules;

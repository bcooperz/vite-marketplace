import { requestFn } from "./axios";

interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
}

const authenticationApiModules = {
  register: (registerModel: RegisterPayload) => {
    return requestFn({
      method: "POST",
      path: "/auth/register",
      payload: registerModel,
    });
  },
};

export default authenticationApiModules;

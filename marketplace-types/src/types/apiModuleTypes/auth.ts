import { RegisterPayload } from "../payloadTypes/auth";
import { RegisterResponse } from "../responseTypes/auth";

export interface RegisterApiModule {
  registerPayload: RegisterPayload;
  responseType: RegisterResponse;
}

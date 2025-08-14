import type { ApiErrors } from "@/errors/types";
import type { AxiosResponse } from "axios";

export interface RequestFnSuccessResponse<T> {
  data: T;
  error: null;
}

export interface RequestFnErrorResponse {
  data: null;
  error: ApiErrors;
}

export type RequestFnResponseAxiosResponse<T> = AxiosResponse<
  RequestFnSuccessResponse<T> | RequestFnErrorResponse
>;

export interface ValidationError {
  path: string;
  message: string;
}

export interface ApiError {
  status: "error";
  message: string;
  errors?: ValidationError[];
}

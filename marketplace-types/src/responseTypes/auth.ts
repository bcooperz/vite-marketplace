interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  user: User;
  updatedAt: number;
}

interface ReAuthenticateResponse {
  user: {
    email: string;
  };
  updatedAt: number;
}

interface RegisterResponse {
  user: User;
  updatedAt: number;
}

export type { LoginResponse, ReAuthenticateResponse, RegisterResponse };

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  error?: string;
}
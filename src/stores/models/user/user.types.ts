export interface UserState {
  isAuthenticated: boolean;
  isLoading: boolean;
  errorMessage: string;
  user: {
    userName: string;
    email: string;
    token: string;
  };
}

export interface ResponseType {
  success: boolean;
  message: string;
  data: {
    userName: string;
    email: string;
    token: string;
  };
}

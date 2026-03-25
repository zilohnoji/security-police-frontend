export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  email: string;
}

export interface ActivationResponse {
  id: string;
  email: string;
}


import { ScaleDetailsResponse } from "../scale/scale.dto";

export interface SignupUserRequest {
  email: string;
  password: string;
}

export interface SignupPersonRequest {
  profile: SignupProfileRequest;
  address: SignupAddressRequest;
}

export interface SignupProfileRequest {
  full_name: string;
  birth_date: string;
  gender: string;
  mother_name: string;
  father_name: string;
}

export interface SignupAddressRequest {
  street_type: string;
  street: string;
  number: number;
  neighborhood: string;
  city: SignupCityRequest;
}

export interface SignupCityRequest {
  name: string;
  uf: string;
}

export interface SignupUserResponse {
  id: string;
  email: string;
}

export interface ActivationResponse {
  id: string;
  email: string;
}

export interface SignupPersonResponse {
  id: string;
  profile: SignupProfileResponse;
  address: SignupAddressResponse;
  scales: ScaleDetailsResponse[];
}

export interface SignupProfileResponse {
  name: string;
  birthDate: Date;
  gender: string;
  motherName: string;
  daddyName: string;
}

export interface SignupAddressResponse {
  patioType: string;
  street: string;
  number: number;
  neighborhood: string;
  city: SignupCityResponse;
}

export interface SignupCityResponse {
  name: string;
  uf: string;
}
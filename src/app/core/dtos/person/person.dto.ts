import { ScaleDetailsResponse } from "../scale/scale.dto";

export interface PersonDetailsResponse {
  id: string;
  role: string;
  profile: ProfileDetailsResponse;
  address: AddressDetailsResponse;
  scales: ScaleDetailsResponse[];
}

export interface ProfileDetailsResponse {
  name: string;
  birthDate: string;
  gender: string;
  motherName: string;
  daddyName: string;
}

export interface AddressDetailsResponse {
  patioType: string;
  street: string;
  number: string;
  neighborhood: string;
  city: CityDetailsResponse;
}

export interface CityDetailsResponse {
  name: string;
  uf: string;
}

import { CityDetailsResponse } from "../city/response-details.dto";

export interface AddressDetailsResponse {
  patioType: string;
  street: string;
  number: string;
  neighborhood: string;
  city: CityDetailsResponse;
}
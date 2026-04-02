import { AddressDetailsResponse } from "../address/response-details.dto";
import { DocumentDetailsResponse } from "../document/response-details.dto";
import { ScaleDetailsResponse } from "../scale/response-details.dto";

export interface PersonDetailsResponse {
  id: string;
  role: string;
  profile: {
    name: string;
    birthDate: string;
    gender: string;
    motherName: string;
    daddyName: string;
    photo: DocumentDetailsResponse;
  };
  address: AddressDetailsResponse;
  scales: ScaleDetailsResponse[];
}
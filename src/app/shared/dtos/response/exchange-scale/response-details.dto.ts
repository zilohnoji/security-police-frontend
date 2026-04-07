import { RequestResponseDetails } from "../request/response-details.dto";
import { ScaleDetailsResponse } from "../scale/response-details.dto";

export interface ExchangeScaleResponseDetails {
  id: string,
  status: string,
  request: RequestResponseDetails,
  scale: ScaleDetailsResponse
}
import { PersonDetailsResponse } from "../person/reponse-details.dto"

export interface ScaleDetailsResponse {
  id: string,
  isCompleted: boolean,
  createdAt: Date,
  startsAt: Date,
  finishedAt: Date,
  description: string
}

export interface ScaleAdminDetailsResponse {
  id: string,
  isCompleted: boolean,
  createdAt: Date,
  startsAt: Date,
  finishedAt: Date,
  description: string,
  agents: PersonDetailsResponse[]
}
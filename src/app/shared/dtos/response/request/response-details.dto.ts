export interface RequestResponseDetails {
  id: string,
  isCompleted: boolean,
  requestedBy: UserRequestedByResponseDetails,
  receivedBy: UserReceivedByResponseDetails,
  description: string,
  cratedAt: Date
}

export interface UserRequestedByResponseDetails {
  id: string,
  name: string
}

export interface UserReceivedByResponseDetails {
  id: string,
  name: string
}
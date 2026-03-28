import { Pageable } from "./pageable.dto";

export interface Page<T> {
  elements: T[],
  pageable: Pageable,
  totalElements: number,
  totalPages: number
}
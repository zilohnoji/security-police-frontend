export interface Pageable {
  page: number,
  pageSize: number,
  sortDirection: 'asc' | 'desc',
  sortTerm: string,
  searchTerm: string
}
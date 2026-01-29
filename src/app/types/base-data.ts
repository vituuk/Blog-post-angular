export interface BaseData<T> {
  data: T;
}

export interface PaginationProps {
  limit?: number;
  page?: number;
  total?: number
  [key: string]: any;
}

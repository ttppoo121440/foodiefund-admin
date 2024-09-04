import { TableColumnsType } from 'antd';

export interface TableDataProps<T> {
  data: T[];
  columns: TableColumnsType<T>;
  name: string;
  isLoading: boolean;
  setSearch: (value: string) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  pageSize: number;
  total: number;
  children?: React.ReactNode;
}

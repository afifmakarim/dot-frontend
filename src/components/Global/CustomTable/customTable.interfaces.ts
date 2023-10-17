import type { TableProps } from "antd";

export interface CustomTableProps<T> extends TableProps<T> {
  isLoading?: boolean;
}

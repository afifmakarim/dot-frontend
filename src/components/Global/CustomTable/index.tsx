import { CustomTableProps } from "./customTable.interfaces";
import { Spin, Table } from "antd";

export default function CustomTable<T extends object>(
  props: CustomTableProps<T>
) {
  const { isLoading } = props;

  return (
    <Spin spinning={isLoading}>
      <Table {...props} />
    </Spin>
  );
}

import { PaginationProps, Pagination, Select } from "antd";

type IProps = Omit<PaginationProps, "itemRender" | "showSizeChanger"> & {
  handlePageSizeChange?: (value: number) => void;
  handlePageChange?: (page: number, pageSize?: number | undefined) => void;
};

const TablePagination: React.FC<IProps> = ({
  handlePageSizeChange,
  current = 1,
  total = 1,
  pageSize = 10,
  handlePageChange,
  ...restProps
}) => {
  const pageSizeOptions = ["10", "20", "50", "100"];
  return (
    <div className="p-2 py-3 flex justify-between rounded-b-lg bg-base-white shadow-xl text-gray-600">
      <div className="ml-4">
        <span className="text-sm">
          {total === 0 ? pageSize : total} {"-с  "}
          {pageSize * current - pageSize + 1} - {pageSize * current}
          {"-г харуулж байна "}
        </span>
      </div>

      <div>
        <Pagination
          current={current}
          total={total}
          {...restProps}
          // total={metaData ? metaData.total_row :0}
          pageSize={pageSize}
          onChange={handlePageChange}
          style={{ textAlign: "center" }}
        />
      </div>

      <div>
        <span className="text-sm">Мөрүүдийг харуулах:</span>

        <Select value={pageSize} onChange={handlePageSizeChange}>
          {pageSizeOptions.map((option: string) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
    // </div>
  );
};

export default TablePagination;
//

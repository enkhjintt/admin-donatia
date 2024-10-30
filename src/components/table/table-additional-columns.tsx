import { TableColumnTitle } from "./custom-table";

interface Props {
  currentPage: number;
  pageSize: number;
  column?: any[] | undefined;
  isIndex?: boolean;
}

const NewsUpdateColumn = ({
  currentPage,
  pageSize,
  column,
  isIndex,
}: Props) => {
  let indexNumber = (currentPage - 1) * pageSize;

  const updatedColumns: any[] = isIndex
    ? [
        {
          title: <TableColumnTitle title="№" />,
          align: "center",
          key: "Iindex",
          fixed: "left",
          width: 70,

          render: (text: any, record: any, index: number) => (
            <span key={index}>{indexNumber + index + 1}</span>
          ),
        },
        ...(column ? column : []),
      ]
    : column
    ? column
    : [];

  return updatedColumns;
};

export default NewsUpdateColumn;

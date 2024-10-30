"use client";

import { TableClassName } from "@/utils/style-utils";
import { Table } from "antd/lib";
import { useEffect, useMemo, useState } from "react";
import NewsUpdateColumn from "./table-additional-columns";
import TablePagination from "./table-pagination";
import AddinionalEye from "./table-addinional-eye";
import AddinionalEdit from "./table-addinional-edit";

// import AddinionalDot, { BaseUrls } from './table-addinional-dot';
import { ExpandableConfig } from "antd/es/table/interface";
import AddinionalDot from "./table-addinional-dot";
import AddinionalAction from "./table-additional-action";
import AddinionalDelete from "./table-addinional-delete";
import AdditionalActive from "./table-additional-active";

export const TableColumnTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <span className=" inline-block min-w-max font-semibold text-gray-700 text-xs leading-2">
      {title}
    </span>
  );
};

type TTprops = {
  expandable?: ExpandableConfig<any>;
  column?: any[];
  metaData?: any;
  // onPageChange?: ({
  //   page_number,
  //   page_size,
  // }: {
  //   page_number,
  //   page_size;
  // }:any) => any;

  onPageChange?: (
    pagination?: any,
    filter?: any,
    sorter?: any
    // { page_number, page_size }: any,
  ) => any;
  hasPagination?: boolean;
  isIndex?: boolean;
  data?: any;
  isDot?: boolean;
  // menuUrl?: BaseUrls[];
  isEye?: boolean;
  isEdit?: boolean;
  isAction?: boolean;
  isDelete?: boolean;
  isLoading?: boolean;
  rowKey?: string;
  showEye?: boolean;
  showEdit?: boolean;
  showLock?: boolean;
  isActive?: boolean;
  isSelect?: boolean;
  showTrash?: boolean;
  showCircle?: boolean;
  showCircleActive?: boolean;
  showBlackList?: boolean;
  showRmBlackList?: boolean;
  showActionStatus?: boolean;
  showToPay?: boolean;
  showPayInCash?: boolean;
  showDelivery?: boolean;
  removeLock?: boolean;
  removeTrashBin?: boolean;
  removeEdit?: boolean;
  removeEye?: boolean;
  showPlus?: boolean;
  showCorrect?: boolean;
  notTrashBin?: (id: number, serial_number: string) => void;
  plusShowHandler?: (id: number, serial_number: string) => void;
  showCorrectHandler?: (id: number, serial_number: string) => void;
  statusHanlder?: (value: any) => void;
  onSelectChange?: (
    newSelectedRowKeys?: any,
    selectedRowKeys?: any,
    setState?: any
  ) => any;

  eyeHandler?: (id: number) => void;
  // lockHandler?: (id: any, serial_number?: string) => void;
  trashHandler?: (value: any) => void;
  editHandler?: (id: any, serial_number?: string) => void;
  closeHandler?: (value: any) => void;
  closeActiveHandler?: (value: any) => void;
  rmBlackListHandler?: (value: any) => void;
  blackListHandler?: (id: any) => void;
  toPayHandler?: (id: number) => void;
  payInCashHandler?: (id: number) => void;
  deliveryHandler?: (record: any) => void;
  activeHandler?: (value: any) => void;
};

const CustomTable: React.FC<TTprops> = ({
  expandable,
  column,
  metaData,
  onPageChange,
  hasPagination = true,
  isIndex,
  data: datas,
  isDot,
  // menuUrl,
  eyeHandler,
  trashHandler,
  onSelectChange,

  isEye,
  isEdit,
  isDelete,
  isAction,
  isSelect,

  isActive,
  isLoading,
  rowKey = "id",

  showEye,
  showEdit,
  showLock,
  showTrash,
  showCircle,
  showActionStatus,
  showCircleActive,

  showCorrect,
  deliveryHandler,
  showDelivery,
  removeLock,
  removeEye,
  removeEdit,
  notTrashBin,
  removeTrashBin,
  plusShowHandler,
  statusHanlder,
  activeHandler,
  // lockHandler,
  closeHandler,
  closeActiveHandler,
  editHandler,
}) => {
  const [tableDatas, setTableDatas] = useState<any[]>([]);
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState([]);

  const [currentPage, setCurrentPage] = useState<number>(
    metaData ? (metaData.page_number ? Number(metaData.page_number) : 1) : 1
  );

  useEffect(() => {
    if (
      metaData &&
      metaData.page_number &&
      currentPage !== metaData.page_number
    ) {
      setCurrentPage(metaData.page_number);
    }
  }, [metaData, currentPage]);

  const newColumn: any[] = NewsUpdateColumn({
    currentPage,
    pageSize,
    column,
    isIndex,
  });

  const newMemorizedColumn = useMemo(() => {
    const newsUpdatedColumn = [...newColumn];

    const newColumnDot = AddinionalDot({
      isDot,
      //   // menuUrl,
      showEye,
      showEdit,
      showLock,
      showTrash,
      showCircle,
      showCircleActive,

      trashHandler,
      eyeHandler,
      // lockHandler,
      closeHandler,
      closeActiveHandler,
      editHandler,
    });

    const newColumnEye = AddinionalEye({
      eyeHandler,
      isEye,
    });

    const newColumnEdit = AddinionalEdit({
      editHandler,
      isEdit,
    });

    const newColumnDelete = AddinionalDelete({
      trashHandler,
      isDelete,
    });

    const newColumnAction = AddinionalAction({
      isAction,
      // plusShowHandler,
      editHandler,
      trashHandler,
      notTrashBin,
      // lockHandler,
      eyeHandler,
      showDelivery,
      // showPlus,
      showCorrect,
      removeLock,
      removeEye,
      removeEdit,
      deliveryHandler,
      statusHanlder,
      removeTrashBin,
      showActionStatus,
    });

    const newColumnActive = AdditionalActive({
      activeHandler,
      isActive,
    });

    if (newColumnActive) {
      newsUpdatedColumn.push(newColumnActive);
    }

    if (newColumnAction) {
      newsUpdatedColumn.push(newColumnAction);
    }

    if (newColumnEye) {
      newsUpdatedColumn.push(newColumnEye);
    }

    if (newColumnEdit) {
      newsUpdatedColumn.push(newColumnEdit);
    }

    if (newColumnDelete) {
      newsUpdatedColumn.push(newColumnDelete);
    }

    if (newColumnDot) {
      newsUpdatedColumn.push(newColumnDot);
    }

    return newsUpdatedColumn.map((col) => ({
      ...col,
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ffffff",
            color: "#ffffff",
          },
        };
      },
      // className: "bg:secondary-normal",
    }));
  }, [currentPage, pageSize, column, isIndex]);

  useEffect(() => {
    setTableDatas(datas);

    setTableColumns(column === null ? column : newMemorizedColumn);
  }, [newMemorizedColumn, column, datas]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange({ page_number: page, page_size: pageSize });
    }
  };

  const handlePageSizeChange = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
    if (onPageChange) {
      onPageChange({ page_number: 1, page_size: value });
    }
  };

  const handleSelectChange = (newSelectedRowKeys: any[]) => {
    onSelectChange
      ? onSelectChange(newSelectedRowKeys, selectedRowKeys, setSelectedRowKeys)
      : () => {};
  };

  let rowSelection;
  if (isSelect) {
    rowSelection = {
      selectedRowKeys,
      preserveSelectedRowKeys: true,
      onChange: handleSelectChange,
    };
  }

  return (
    <>
      <div className="relative overflow-x-hidden">
        <Table
          bordered
          expandable={expandable}
          loading={isLoading}
          columns={tableColumns}
          className={`${TableClassName} custom-table-header`}
          onChange={onPageChange}
          pagination={false}
          dataSource={tableDatas}
          rowSelection={rowSelection}
          rowKey={rowKey}
          scroll={{
            x: "max-content",
          }}
        />

        {hasPagination && (
          <TablePagination
            current={currentPage}
            pageSize={pageSize}
            total={metaData ? metaData.total_row : datas?.length}
            handlePageSizeChange={handlePageSizeChange}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default CustomTable;

"use client";

import React, { useEffect, useState } from "react";
import CustomTable from "@/components/table/custom-table";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { getMetaData } from "@/utils/pagination-search";
import dayjs from "dayjs";
import { useReportSuccess } from "@/hooks/use-report-success";

const DEFAULT_SEARCH_VALUE = "" as const;

const SuccessIncomeTable: React.FC = () => {
  const [pagination, setPagination] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [begin_date, setCreatedAt] = useState<string>("");
  const [end_date, setUpdatedAt] = useState<string>("");

  const [sortOrder, setSortOrder] = useState({
    sortBy: "",
    sortType: "",
  });

  const [nameSearch, setNameSearch] = useDebouncedState<string>(
    DEFAULT_SEARCH_VALUE,
    500
  );

  const {
    data: reportData,
    isLoading,
    mutate,
  } = useReportSuccess(pagination, undefined, {
    sort_by: sortOrder.sortBy,
    sort_type: sortOrder.sortType,
    begin_date,
    end_date,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    mutate();
  }, [pagination, nameSearch, begin_date, end_date]);

  const handleStartDate = (startDate: string) => {
    setCreatedAt(startDate);
    setPagination((prev) => ({ ...prev, page_number: 1 }));
  };

  const handleEndDate = (endDate: string) => {
    setUpdatedAt(endDate);
    setPagination((prev) => ({ ...prev, page_number: 1 }));
  };

  const handlePageChange = (
    pagination: any,
    filters: any,
    sorter: any
  ): void => {
    if (pagination) {
      setPagination(pagination);
    }

    if (sorter?.order || sorter?.field) {
      setSortOrder({
        sortBy: sorter.field || sorter.columnKey,
        sortType: sorter.order === "descend" ? "DESC" : "ASC",
      });
    }
  };

  const columns = [
    {
      title: "Төслийн нэр",
      dataIndex: "garchig",
      fixed: "left",
      render: (value: string) => value || "-",
    },
    {
      title: "Төслийн төрөл",
      dataIndex: "tusul_turul_ner",
      render: (value: string) => value || "-",
    },
    {
      title: "Шимтгэл",
      dataIndex: "shimtgel_huvi",
      render: (text: number) => `${text} %`,
    },
    {
      title: "Дүн",
      dataIndex: "percentage_dun",
      render: (value: number) => `${value.toLocaleString()}₮` || "-",
    },
    {
      title: "Төёөл дууссан огноо",
      dataIndex: "tusul_duussan_ognoo",
      sorter: true,
      render: (value: string) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
    {
      title: "Огноо",
      dataIndex: "created_at",
      sorter: true,
      render: (value: string) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
  ];

  const metaData = getMetaData(reportData);
  const sumPercentageDun = reportData?.sum_percentage_dun || 0;
  const tableData = reportData?.items || [];

  return (
    <>
    <div className="w-full flex text-justify  text-gray-800 text-lg">
          Амжилттай төслийн шимтгэлээс олсон орлогын тайлан
      </div>
      <CustomTable
        isAction
        isIndex
        removeLock
        isLoading={loading}
        removeEye
        removeEdit
        removeTrashBin
        column={columns}
        data={tableData}
        metaData={metaData}
        onPageChange={handlePageChange}
        hasPagination
        rowKey="garchig"
      />
      <div className="w-full flex justify-end px-6 py-2 bg-base-white rounded-lg">
        <span>Нийт орлого: {sumPercentageDun.toLocaleString()}₮</span>
      </div>
    </>
  );
};

export default SuccessIncomeTable;

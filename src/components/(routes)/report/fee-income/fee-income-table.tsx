"use client";

import React, { useEffect, useState } from "react";
import CustomTable from "@/components/table/custom-table";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { useReportFee } from "@/hooks/use-report-fee";
import { getMetaData } from "@/utils/pagination-search";
import dayjs from "dayjs";
import FeeTabActions from "./tab-actions";

const DEFAULT_SEARCH_VALUE = "" as const;

const FeeIncomeTable: React.FC = () => {
  const [pagination, setPagination] = useState({
    page_number: 1,
    page_size: 50,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [created_at, setCreatedAt] = useState<string>("");
  const [calculated_end_date, setUpdatedAt] = useState<string>("");

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
  } = useReportFee(pagination, undefined, {
    garchig: nameSearch,
    sort_by: sortOrder.sortBy,
    sort_type: sortOrder.sortType,
    created_at,
    calculated_end_date,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    mutate();
  }, [pagination, nameSearch, created_at, calculated_end_date]);

  function handleChangeSearch(newSearch: string) {
    setNameSearch(newSearch);
    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }
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
      title: "Төслийн хугацаа",
      dataIndex: "honog",
      render: (text: number) => `${text} хоног`,
    },
    {
      title: "Дүн",
      dataIndex: "dun",
      render: (value: number) => `${value.toLocaleString()}₮` || "-",
    },
    {
      title: "Эхлэх огноо",
      dataIndex: "created_at",
      sorter: true,
      render: (value: string) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
    {
      title: "Дуусах огноо",
      dataIndex: "calculated_calculated_end_date",
      sorter: true,
      render: (value: string) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
  ];

  const metaData = getMetaData(reportData);
  const sumPercentageDun = reportData?.sum_percentage_dun || 0;
  const tableData = reportData?.items || [];

  return (
    <><FeeTabActions
    onChangeSearch={handleChangeSearch}
    onStartDateChange={handleStartDate}
    onEndDateChange={handleEndDate}
    resLength={0}
  />
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

export default FeeIncomeTable;

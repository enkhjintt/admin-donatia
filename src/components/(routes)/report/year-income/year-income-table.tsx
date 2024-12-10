"use client";

import React, { useEffect, useState } from "react";
import CustomTable from "@/components/table/custom-table";
import Wrapper from "@/components/wrapper";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { useReportFee } from "@/hooks/use-report-fee";
import { getMetaData } from "@/utils/pagination-search";
import dayjs from "dayjs";
import { useReportYear } from "@/hooks/use-report-year";
import YearTabActions from "./tab-actions";

const DEFAULT_SEARCH_VALUE = "" as const;

const YearIncomeTable: React.FC = () => {
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
  } = useReportYear(pagination, undefined, {
    orlogo_type: nameSearch,
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
      title: "Орлогын төрөл",
      dataIndex: "orlogo_type",
      fixed: "left",
      render: (value: string) => value || "-",
    },
    {
      title: "Нийт дүн",
      dataIndex: "ognoo_sum",
      render: (value: number) => `${value.toLocaleString()}₮` || "-",
    },
    {
      title: "Огноо",
      dataIndex: "ognoo",
      sorter: true,
      render: (value: string) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
  ];

  const metaData = getMetaData(reportData);
  const sumPercentageDun = reportData?.sum_percentage_dun || 0;
  const tableData = reportData?.items || [];

  return (
    <>
      <div className="w-full grid grid-cols-1 text-justify  ">
        <span className="text-gray-600 text-sm">
          `Төсөл байршуулсан үйлчилгээний хураамж` болон `Амжилттай төсөл`-н
          шимтгэлээс олсон 1 жилийн (1 сарын 1 өдрөөс өнөөдрийг хүртэлх) нийт
          орлогын хэмжээг илэрхийлнэ.
        </span>
      </div>
      {/* <YearTabActions
        onStartDateChange={handleStartDate}
        onEndDateChange={handleEndDate}
        resLength={0} 
        onChangeSearch={handleChangeSearch }/> */}
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

export default YearIncomeTable;

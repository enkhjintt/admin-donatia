"use client";

import { useEffect, useState } from "react";
import CustomTable from "@/components/table/custom-table";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { getMetaData } from "@/utils/pagination-search";
import DeleteConfirmationModal from "@/components/modal/delete-modal";
import { useNotification } from "@/hooks/use-notification";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import PaymentStatusTabActions from "./tab-actions";
import React from "react";
import { usePaymentStatus } from "@/hooks/use-payment-status";
import { DeletePaymentStatus } from "@/api/ref/payment-status";

type IProps = {};

const DEFAULT_SEARCH_VALUE = "" as const;

const PaymentStatusTable: React.FC<IProps> = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [begin_date, setCreatedAt] = useState<string>("");
  const [status, setStatusAt] = useState<string>("");
  const [end_date, setUpdatedAt] = useState<string>("");
  const [device_type, setDevice] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<
    { visible: false } | { visible: true; selectedId: number }
  >({ visible: false });

  const { success, error } = useNotification();

  const [sortOrder, setSortOrder] = useState<{
    sortBy: string;
    sortType: string;
  }>({
    sortBy: "",
    sortType: "",
  });

  const [serialNumSearch, setNameSearch] = useDebouncedState<string>(
    DEFAULT_SEARCH_VALUE,
    500
  );

  const {
    data: PaymentStatuss,
    isLoading,
    mutate,
  } = usePaymentStatus(pagination, {
    tulbur_tuluv_ner: status,
    sort_by: sortOrder.sortBy,
    sort_type: sortOrder.sortType,
    begin_date: begin_date,
    end_date: end_date,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    mutate();
  }, [pagination, serialNumSearch, status, begin_date, end_date]);

  function handleChangeSearch(newSearch: string) {
    setNameSearch(newSearch);

    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }

  function handleStartDate(begin_date: string) {
    setCreatedAt(begin_date);

    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }
  function handleType(device_type: string) {
    setDevice(device_type);
    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }
  function handleStatus(status: string) {
    setStatusAt(status);

    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }

  function handleEndDate(end_date: string) {
    setUpdatedAt(end_date);

    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }

  const handlePageChange = (
    pagination: any,
    filters: any,
    sorter: any
  ): any => {
    if (pagination) {
      setPagination(pagination);
    }

    if (sorter?.order || sorter?.field) {
      setSortOrder({
        sortBy: sorter.field ? sorter.field : sorter.columnKey,
        sortType: sorter.order === "descend" ? "DESC" : "ASC",
      });
    }
  };

  const metaData = getMetaData(PaymentStatuss);

  const handleDeletePaymentStatus = async () => {
    if (deleteModal.visible) {
      setLoading(true);

      const response = await DeletePaymentStatus(deleteModal.selectedId);

      setLoading(false);

      if (response.success) {
        mutate();

        success("Төлбөрийн төлөв амжилттай устлаа!");

        setDeleteModal({ visible: false });
      } else {
        error(response.error.message);
      }
    }
  };

  //eye icon deer darahad edit huudas ruu shiljne
  const editHandler = (id: number) => {
    router.push(`/ref/payment-status/edit-status/${id}`);
  };

  //delete icon deer darahad id-g selectleed ustgana
  const handleDeleteModal = (id: number) => {
    setDeleteModal({ visible: true, selectedId: id });
  };

  //edit icon deer darahad edit huudas ruu shiljne
  const eyeHandler = (id: number) => {
    router.push(`/ref/payment-status/view-type/${id}`);
  };

  const columns = [
    {
      title: "Төлбөрийн төлөв нэр",
      dataIndex: "tulbur_tuluv_ner",
      align: "center",
      fixed: "left",
    },
    {
      title: "Бүртгэсэн огноо",
      dataIndex: "created_at",
      sorter: true,
      align: "center",
      width: 200,
      render: (value: Date) => {
        dayjs(value).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "Шинэчилсэн огноо",
      dataIndex: "updated_at",
      sorter: true,
      align: "center",
      width: 200,
      render: (value: Date) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
  ];

  return (
    <>
      <DeleteConfirmationModal
        visible={deleteModal.visible}
        showStatus={true}
        onCancel={() => setDeleteModal({ visible: false })}
        onConfirm={handleDeletePaymentStatus}
      />
      {/* tabActions ni table-n deerh haih uildluud */}
      <PaymentStatusTabActions
        onTypeSearch={handleType}
        onStatusChange={handleStatus}
        onChangeSearch={handleChangeSearch}
        onStartDateChange={handleStartDate}
        onEndDateChange={handleEndDate}
        resLength={0}
      />

      <CustomTable
        isAction
        isIndex
        removeEye
        removeLock
        isLoading={loading}
        eyeHandler={eyeHandler}
        editHandler={editHandler}
        trashHandler={handleDeleteModal}
        column={columns}
        data={PaymentStatuss?.items}
        metaData={metaData}
        onPageChange={handlePageChange}
        hasPagination
        rowKey="id"
      />
    </>
  );
};

export default PaymentStatusTable;
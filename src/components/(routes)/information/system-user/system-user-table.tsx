"use client";

import React from "react";
import { useEffect, useState } from "react";
import CustomTable from "@/components/table/custom-table";
import { Avatar } from "antd";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { getMetaData } from "@/utils/pagination-search";
import SystemUserTabActions from "./tab-actions";
import DeleteConfirmationModal from "@/components/modal/delete-modal";
import { useNotification } from "@/hooks/use-notification";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useSystemUsers } from "@/hooks/system-user";
import { deleteUser } from "@/api/user/system-user";

const formatDate = (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm");

type IProps = {};

const DEFAULT_SEARCH_VALUE = "" as const;

const SystemUserTable: React.FC<IProps> = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  // const [role, setRole] = useState<string>();
  const [begin_date, setCreatedAt] = useState<string>("");
  const [end_date, setUpdatedAt] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<
    { visible: false } | { visible: true; selectedId: number }
  >({ visible: false });

  const { success, error } = useNotification();

  const [sortuser, setSortuser] = useState<{
    sortBy: string;
    sortType: string;
  }>({
    sortBy: "",
    sortType: "",
  });

  const [firstNameSearch, setfirstNameSearch] = useDebouncedState<string>(
    DEFAULT_SEARCH_VALUE,
    500
  );
  const [roleSearch, setRoleSearch] = useDebouncedState<string>(
    DEFAULT_SEARCH_VALUE,
    500
  );
  const [orgSearch, setOrgSearch] = useDebouncedState<string>(
    DEFAULT_SEARCH_VALUE,
    500
  );

  const {
    data: SystemUsers,
    isLoading,
    mutate,
  } = useSystemUsers(pagination, {
    ner: firstNameSearch,
    organization_name: orgSearch,
    roles: roleSearch,
    sort_by: sortuser.sortBy,
    sort_type: sortuser.sortType,
    begin_date: begin_date,
    end_date: end_date,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    mutate();
  }, [
    pagination,
    firstNameSearch,
    roleSearch,
    orgSearch,
    begin_date,
    end_date,
  ]);

  function handleChangeSearch(newSearch: string) {
    setfirstNameSearch(newSearch);

    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }
  function handleRoleSearch(newSearch: string) {
    setRoleSearch(newSearch);
    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }

  function handleOrgSearch(newSearch: string): void {
    setOrgSearch(newSearch);
    setPagination((prev) => ({ ...prev, page_number: 1 }));
  }
  function handleStartDate(begin_date: string) {
    setCreatedAt(begin_date);

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

    if (sorter?.user || sorter?.field) {
      setSortuser({
        sortBy: sorter.field ? sorter.field : sorter.columnKey,
        sortType: sorter.user === "descend" ? "DESC" : "ASC",
      });
    }
  };

  const metaData = getMetaData(SystemUsers);

  const columns = [
    {
      title: "Нэр",
      dataIndex: "ner",
      key: "ner",
    },
    {
      title: "Цахим хаяг",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Утасны дугаар",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Бүртгэсэн огноо",
      dataIndex: "created_at",
      sorter: true,
      key: "created_at",
      render: (text: any, record: any) => (
        <span>{formatDate(record.created_at)}</span>
      ),
    },
    {
      title: "Шинэчилсэн огноо",
      dataIndex: "updated_at",
      sorter: true,
      key: "updated_at",
      render: (text: any, record: any) => (
        <span>{formatDate(record.updated_at)}</span>
      ),
    },
  ];

  const handleDeleteSystemUser = async () => {
    if (deleteModal.visible) {
      setLoading(true);

      const response = await deleteUser(deleteModal.selectedId);

      setLoading(false);

      if (response.success) {
        mutate();

        success("Системийн хэрэглэгч амжилттай устлаа!");

        setDeleteModal({ visible: false });
      } else {
        error(response.error.message);
      }
    }
  };

  const editHandler = (id: number) => {
    router.push(`/information/system-user/edit-system-user/${id}`);
  };

  const handleDeleteModal = (id: number) => {
    setDeleteModal({ visible: true, selectedId: id });
  };
  const eyeHandler = (id: number) => {
    router.push(`/information/system-user/view-system-user/${id}`);
  };

  return (
    <>
      <DeleteConfirmationModal
        visible={deleteModal.visible}
        onCancel={() => setDeleteModal({ visible: false })}
        onConfirm={handleDeleteSystemUser}
      />
      <SystemUserTabActions
        onRoleSearch={handleRoleSearch}
        onChangeSearch={handleChangeSearch}
        onStartDateChange={handleStartDate}
        onEndDateChange={handleEndDate}
        onOrgSearch={handleOrgSearch}
        resLength={0}
      />

      <CustomTable
        isAction
        isIndex
        removeLock
        isLoading={loading}
        eyeHandler={eyeHandler}
        editHandler={editHandler}
        trashHandler={handleDeleteModal}
        column={columns}
        data={SystemUsers?.items}
        metaData={metaData}
        onPageChange={handlePageChange}
        hasPagination
        rowKey="id"
      />
    </>
  );
};

export default SystemUserTable;

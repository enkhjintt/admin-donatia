"use client";

import CustomTable from "@/components/table/custom-table";
import dayjs from "dayjs";
import RoleSearchForm from "./role-search-form";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { useEffect, useState } from "react";
import { useRole } from "@/hooks/use-role";
import { getMetaData } from "@/utils/pagination-search";
import DeleteConfirmationModal from "@/components/modal/delete-modal";
import { useNotification } from "@/hooks/use-notification";
import { DeleteRole } from "@/api/role";

type IProps = {};

const DEFAULT_SEARCH_VALUE = "" as const;

const columns = [
  {
    title: "Эрхийн нэр",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Төлөв",
    align: "start",
    render: (value: any) =>
      value?.status && value.status === "active" ? (
        <span className="py-1 block w-20 text-center rounded-xl font-normal text-xs leading-3 bg-success-normal text-gray-200">
          Идэвхтэй
        </span>
      ) : (
        <span className="py-1 block w-20 text-center rounded-xl font-normal text-xs leading-3 bg-error-normal text-gray-200">
          Идэвхгүй
        </span>
      ),
  },
  {
    title: "Бүртгэсэн огноо",
    dataIndex: "created_at",
    sorter: true,
    align: "center",
    render: (value: Date) => (
      <>
        <div>{dayjs(value).format("YYYY-MM-DD HH:mm")}</div>
      </>
    ),
  },
  {
    title: "Шинэчилсэн огноо",
    dataIndex: "updated_at",
    render: (value: Date) => (
      <>
        <div>{dayjs(value).format("YYYY-MM-DD HH:mm")}</div>
      </>
    ),
  },
];

const RoleTable: React.FC<IProps> = ({}) => {
  const { success, error } = useNotification();
  const [search, setSearch] = useDebouncedState<string>(
    DEFAULT_SEARCH_VALUE,
    500
  );
  const [begin_date, setCreatedAt] = useState<string>("");
  const [end_date, setUpdatedAt] = useState<string>("");
  const [pagination, setPagination] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const {
    data: roles,
    mutate,
    isLoading,
  } = useRole(pagination, {
    name: search,
    begin_date: begin_date,
    end_date: end_date,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    mutate();
  }, [search]);

  const metaData = getMetaData(roles);

  function handleChangeSearch(newSearch: string) {
    setSearch(newSearch);
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
  const handlePageChange = (params: any) => {
    setPagination(params);
  };
  const [deleteModalVisible, setDeleteModalVisible] = useState<
    { visible: false } | { visible: true; selectedId: number }
  >({ visible: false });

  const deleteRole = async () => {
    if (deleteModalVisible.visible && deleteModalVisible.selectedId) {
      setLoading(true);
      const response = await DeleteRole(deleteModalVisible.selectedId);
      setLoading(false);

      if (response.success) {
        mutate();
        success("Эрх амжилттай устлаа!");
        setDeleteModalVisible({ visible: false });
      } else {
        error(response.error.message);
      }
    }
  };
  return (
    <>
      <RoleSearchForm
        roleLength={metaData?.total_row ?? 0}
        onChangeSearch={handleChangeSearch}
        onEndDateChange={handleEndDate}
        onStartDateChange={handleStartDate}
      />
      <DeleteConfirmationModal
        textLabel=""
        visible={deleteModalVisible.visible}
        onCancel={() => setDeleteModalVisible({ visible: false })}
        onConfirm={deleteRole}
      />
      <CustomTable
        isIndex
        column={columns}
        isAction
        removeLock
        isLoading={loading}
        data={roles?.items}
        onPageChange={handlePageChange}
        trashHandler={(id) =>
          setDeleteModalVisible({ visible: true, selectedId: id })
        }
      />
    </>
  );
};

export default RoleTable;

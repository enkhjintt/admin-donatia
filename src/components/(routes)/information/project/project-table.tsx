"use client";

import { useEffect, useState } from "react";
import CustomTable from "@/components/table/custom-table";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { getMetaData } from "@/utils/pagination-search";
import DeleteConfirmationModal from "@/components/modal/delete-modal";
import { useNotification } from "@/hooks/use-notification";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import ProjectTabActions from "./tab-actions";
import React from "react";
import { useProject } from "@/hooks/use-projects";
import { DeleteProject, ProjectResponse } from "@/api/information/projects";
import { getPlanStatusStyle } from "@/utils/style-utils";

type IProps = {};

const DEFAULT_SEARCH_VALUE = "" as const;

const ProjectTable: React.FC<IProps> = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [begin_date, setCreatedAt] = useState<string>("");
  const [end_date, setUpdatedAt] = useState<string>("");
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

  const [nameSearch, setNameSearch] = useDebouncedState<string>(
    DEFAULT_SEARCH_VALUE,
    500
  );

  const {
    data: Projects,
    isLoading,
    mutate,
  } = useProject(pagination, {
    garchig: nameSearch,
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
  }, [pagination, begin_date, end_date]);

  function handleChangeSearch(newSearch: string) {
    setNameSearch(newSearch);
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

    if (sorter?.order || sorter?.field) {
      setSortOrder({
        sortBy: sorter.field ? sorter.field : sorter.columnKey,
        sortType: sorter.order === "descend" ? "DESC" : "ASC",
      });
    }
  };

  const metaData = getMetaData(Projects);

  const handleDeleteProject = async () => {
    if (deleteModal.visible) {
      setLoading(true);

      const response = await DeleteProject(deleteModal.selectedId);

      setLoading(false);

      if (response.success) {
        mutate();

        success("Төслийн ангилал амжилттай устлаа!");

        setDeleteModal({ visible: false });
      } else {
        error(response.error.message);
      }
    }
  };

  //eye icon deer darahad edit huudas ruu shiljne
  const editHandler = (id: number) => {
    router.push(`/information/project/edit-project/${id}`);
  };

  //delete icon deer darahad id-g selectleed ustgana
  const handleDeleteModal = (id: number) => {
    setDeleteModal({ visible: true, selectedId: id });
  };

  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "garchig",
      width: "300px",
      fixed: "left",
    },
    // {
    //   title: "Дэд гарчиг",
    //   dataIndex: "ded_garchig",
    // },
    {
      title: "Ангилал",
      dataIndex: "tusul_angilal_id",
      render: (_: string, record: ProjectResponse) => {
        return record.TusulAngilal?.ner ?? "-";
      },
    },
    {
      title: "Төрөл",
      dataIndex: "tusul_turul_id",
      render: (_: string, record: ProjectResponse) => {
        return record.TusulTurul?.ner ?? "-";
      },
    },
    {
      title: "Төлөв",
      // dataIndex: "ner",
      render: (value: ProjectResponse) => (
        <>{getPlanStatusStyle(value?.TusulTuluv?.ner ?? null)}</>
      ),
    },
    {
      title: "Төсөл илгээгч",
      dataIndex: "hereglegch_id",
      render: (_: string, record: ProjectResponse) => {
        return record.Hereglegch?.ner ?? "-";
      },
    },
    {
      title: "Бүртгэсэн огноо",
      dataIndex: "created_at",
      sorter: true,
      render: (value: Date) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
    {
      title: "Шинэчилсэн огноо",
      dataIndex: "updated_at",
      sorter: true,
      render: (value: Date) => <>{dayjs(value).format("YYYY-MM-DD HH:mm")}</>,
    },
  ];

  return (
    <>
      <DeleteConfirmationModal
        visible={deleteModal.visible}
        showStatus={true}
        onCancel={() => setDeleteModal({ visible: false })}
        onConfirm={handleDeleteProject}
      />
      {/* tabActions ni table-n deerh haih uildluud */}
      <ProjectTabActions
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
        editHandler={editHandler}
        trashHandler={handleDeleteModal}
        column={columns}
        data={Projects?.items}
        metaData={metaData}
        onPageChange={handlePageChange}
        hasPagination
        rowKey="id"
      />
    </>
  );
};

export default ProjectTable;

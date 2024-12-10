import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ReportYearIncome } from "@/api/report/year-income";

export function useReportYear(
  pagination?: DefaultPagination,
  sum_percentage_dun?: number,
  search?: {

    orlogo_type?: string;

    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tailan/orlogo-jiliintailan/?${params}`,
    (url) => fetcher<PaginationResponse<ReportYearIncome>>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return {
    data: undefined,
    isLoading,
    mutate,
  };
}

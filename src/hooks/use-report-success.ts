import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ReportSuccessIncome } from "@/api/report/success-income";

export function useReportSuccess(
  pagination?: DefaultPagination,
  sum_percentage_dun?: number,
  search?: {
    //end haih col zarlana

    garchig?: string;
    sort_by: string;
    sort_type: string;
    created_at?: string;
    calculated_end_date?: string;

  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tailan/success-income/?${params}`,
    (url) => fetcher<PaginationResponse<ReportSuccessIncome>>(url)
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

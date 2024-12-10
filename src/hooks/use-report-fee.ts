import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { ProjectFeeResponse } from "@/api/ref/project-fee";
import { ReportFeeIncome } from "@/api/report/fee-income";

export function useReportFee(
  pagination?: DefaultPagination,
  sum_percentage_dun?: number,
  search?: {
    //end haih col zarlana
    honog?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tailan/fee-income/?${params}`,
    (url) => fetcher<PaginationResponse<ReportFeeIncome>>(url)
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



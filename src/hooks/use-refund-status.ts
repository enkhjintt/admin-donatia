import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { RefundStatusResponse } from "@/api/ref/refund-status";


export function useRefundStatus(
  pagination?: DefaultPagination,
  search?: {
    //end haih col zarlana
    ner?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/butsaalt/tuluv/?${params}`,
    (url) => fetcher<PaginationResponse<RefundStatusResponse>>(url)
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

export function useRefundStatusById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getRefundStatusById(id),
    (url) => fetcher<RefundStatusResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getRefundStatusById(id: number | undefined) {
  return `/butsaalt/tuluv/get/${id}`;
}

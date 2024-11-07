import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { PaymentStatusResponse } from "@/api/ref/payment-status";

export function usePaymentStatus(
  pagination?: DefaultPagination,
  search?: {
    //end haih col zarlana
    tulbur_tuluv_ner?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tulbur/tuluv/?${params}`,
    (url) => fetcher<PaginationResponse<PaymentStatusResponse>>(url)
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

export function usePaymentStatusById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getPaymentStatusById(id),
    (url) => fetcher<PaymentStatusResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getPaymentStatusById(id: number | undefined) {
  return `/tulbur/tuluv/get/${id}`;
}

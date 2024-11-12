import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { PaymentTypeResponse } from "@/api/ref/payment-type";

export function usePaymentType(
  pagination?: DefaultPagination,
  search?: {
    //end haih col zarlana
    tulbur_helber_ner?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/tulbur/helber/?${params}`,
    (url) => fetcher<PaginationResponse<PaymentTypeResponse>>(url)
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

export function usePaymentTypeById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getPaymentTypeById(id),
    (url) => fetcher<PaymentTypeResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getPaymentTypeById(id: number | undefined) {
  return `/tulbur/helber/get/${id}`;
}

import { fetcher } from "../api/fetcher";

import { DefaultPagination, PaginationResponse } from "@/constants";
import useSWRImmutable from "swr/immutable";
import { generateParams } from "@/utils/pagination-search";
import { BankTypeResponse } from "@/api/ref/bank";

export function useBankType(
  pagination?: DefaultPagination,
  search?: {
    //end haih col zarlana
    bank_turul_ner?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/bank/turul/?${params}`,
    (url) => fetcher<PaginationResponse<BankTypeResponse>>(url)
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

export function useBankTypeById(id: number) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    getDeviceById(id),
    (url) => fetcher<BankTypeResponse>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

export function getDeviceById(id: number | undefined) {
  return `/bank/turul/get/${id}`;
}

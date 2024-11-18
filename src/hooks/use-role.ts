import { fetcher } from "@/api/fetcher";
import { RoleItemResponse } from "@/api/role";
import { DefaultPagination, PaginationResponse } from "@/constants";
import filterUndefinedProperties, { AnyObject } from "@/utils/empty-filter";
import { generateParams } from "@/utils/pagination-search";
import useSWRImmutable from "swr/immutable";

export function useRole(pagination?: DefaultPagination, search?: any) {
  const cleanedData = filterUndefinedProperties(search as AnyObject);
  const params = generateParams(pagination, cleanedData);

  const { data, isLoading, error, mutate } = useSWRImmutable(
    `/role?${params}`,
    (url) => fetcher<PaginationResponse<RoleItemResponse>>(url)
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

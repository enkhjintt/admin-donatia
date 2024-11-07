import { fetcher } from "@/api/fetcher";
import { UserResponse } from "@/api/user";

import { DefaultPagination, PaginationResponse } from "@/constants";
import { generateParams } from "@/utils/pagination-search";
import { mutate as SWRMutate } from "swr";
import useSWRImmutable from "swr/immutable";

export function useSystemUsers(
  pagination?: DefaultPagination,
  search?: {
    first_name?: string;
    organization_name?: string;
    roles?: string | string[];
    // org_name?: string;
    sort_by: string;
    sort_type: string;
    begin_date?: string;
    end_date?: string;
  }
) {
  const params = generateParams(pagination, search);

  const { data, isLoading, mutate, error } = useSWRImmutable(
    `/system/user?${params}`,
    (url: string) => fetcher<PaginationResponse<UserResponse>>(url)
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

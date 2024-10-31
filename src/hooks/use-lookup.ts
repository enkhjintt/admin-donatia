import { TlookUp } from '@/api/common';
import { fetcher } from '@/api/fetcher';
import useSWRImmutable from 'swr/immutable';

export function useLookup(type: string | undefined) {
  const { data, isLoading, mutate, error } = useSWRImmutable(
    `/look-up?type=${type}`,
    (url) => fetcher<TlookUp[]>(url),
  );

  if (data?.success && !error) {
    return { data: data.data, isLoading, mutate };
  }

  return { data: undefined, isLoading, mutate };
}

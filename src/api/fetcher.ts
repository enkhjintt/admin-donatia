import { api } from "./api";

export async function fetcherWithPagination<T>(
  url: string,
  token?: string,
  data?: unknown,
) {
  try {
    const response = await api<T>({
      url,
      token: token,
      method: data ? "POST" : "GET",
      data,
    });


    if (!response.success) {
      const info = response.error.code;
      const status = response.error.code;

      const error = new Error("" + response.error.code);
      Object.assign(error, { info, status });

      throw error;
    }
    return response;
  } catch (error) {
 
    throw error;
  }
}

export async function fetcher<T>(url: string, token?: string, data?: unknown) {
  const response = await fetcherWithPagination<T>(url, token, data);
  return response;
}

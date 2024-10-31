import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { iToken } from "@/hooks/use-Token";
// import 'dotenv/config';  // Ensure this line is at the top

export function isServer() {
  return typeof window === "undefined";
}

export async function api<T>({
  url,
  method,
  token,
  data,
  config,
}: {
  url: string;
  method: Method;
  token?: string;
  data?: any | any[];
  config?: AxiosRequestConfig;
}): Promise<ApiResponse<T>> {
  const server = isServer(); // Check if the function is running on the server

  const baseUrl = server ?  process.env.NEXT_PUBLIC_BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL;

  // Use server-specific or client-specific logic
  const access_token = !server ? await iToken() : undefined;
  const newToken = access_token ? access_token : token;

  const baseConfig: AxiosRequestConfig = {
    ...config,
    baseURL: config?.baseURL || baseUrl,
    method,
    url,
    data,
    headers: {
      ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
      ...config?.headers,
    },
  };

  let response: ApiResponse<T>;

  try {
    const axiosResponse = await axios(baseConfig);

    const success = axiosResponse.status === 200;

    let result: ApiResponse<T>;

    if (success) {
      result = {
        success: true,
        data: axiosResponse.data as T,
        message: axiosResponse.data.message,
      };
    } else {
      result = {
        success: false,
        error: {
          code: axiosResponse.status,
          message: "Request failed",
        },
      };
    }

    if (!server && process.env.NODE_ENV === "development") {
      // Log on the client side only
      console.log({
        Api: url,
        Success: success,
        errorMessage: (result as ErrorResponse).error?.message,
        errorCode: (result as ErrorResponse).error?.code,
      });
    }

    response = result;
  } catch (error) {
    if (axios.isCancel(error)) {
      response = {
        success: false,
        error: {
          code: 1,
          message: "Request cancelled",
        },
      };
    } else {
      let errorMessage = "Та түр хүлээгээд дахин оролдоно уу";

      if (!server && process.env.NODE_ENV === "development") {
        // Log errors on the client side
        console.log("error on ApiHelpers:", error);
      }

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message || errorMessage;
      }

      response = {
        success: false,
        error: {
          code: 0,
          message: errorMessage,
        },
      };
    }
  }

  return response;
}

export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
  metaData?: {
    pageNumber: number;
    recordsPerPage: number;
    numberOfPages: number;
    numberOfRecords: number;
  };
};

type Error = {
  code: number;
  message: string;
};

type ErrorResponse = {
  success: false;
  error: Error;
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

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

export async function apiLogin<T>({
  url,
  method,
  data,
  config,
}: {
  url: string;
  method: Method;
  data?: any | any[];
  config?: AxiosRequestConfig;
}): Promise<ApiResponse<T>> {
  const baseConfig: AxiosRequestConfig = {
    ...config,
    baseURL: config?.baseURL || process.env.NEXT_PUBLIC_BACKEND_URL,
    method,
    url,
    data,
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
        message: axiosResponse.data.message, // Add this line
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

    if (process.env.NODE_ENV === "development") {
      console.log({
        Api: url,
        Success: success,
        errorMessage: (result as ErrorResponse).error?.message,
        errorCode: (result as ErrorResponse).error?.code,
      });
    }

    response = result;
  } catch (error) {
    console.log({
      error,
    });

    if (axios.isCancel(error)) {
      response = {
        success: false,
        error: {
          code: 1,
          message: "Request cancelled",
        },
      };
    } else {
      let errorMessage = "Та түр хүлээгээд дахин оролдоно уу"; // default error message

      if (process.env.NODE_ENV === "development") {
        // console.log("error on ApiHelpers:", error);
      }

      if (error instanceof AxiosError) {
        // console.log("ERROR", error.response?.data.message);
        errorMessage = error.response?.data.message || errorMessage; // use server error message if it exists
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

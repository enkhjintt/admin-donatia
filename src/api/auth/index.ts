import axios, { AxiosRequestConfig } from "axios";
import { apiLogin } from "../login-api";
import { api } from "../api";

export type LoginResponse = {
  token: string | undefined;
  permission: string[] | undefined;
  level: string | undefined;
  user: {
    user_id: number;
    exp: number;
    org_id: number;
  };
};
export type ChangeResponse = {
  email: string;
  new_password: string;
  token: string | undefined;
  permission: string[] | undefined;
  level: string | undefined;
  user: {
    user_id: number;
    exp: number;
    org_id: number;
  };
};

//
export function loginRequest(data: { email: string; password: string }) {
  return apiLogin<LoginResponse>({
    url: `/auth/login`,
    method: "POST",
    data,
  });
}

export function otpRequest(data: { email: string }) {
  return api({
    url: `/auth/forget-password`,
    method: "POST",
    data,
  });
}

export type SuccessResponse<T> = {
  success: true; // Ensure success is true for success response
  data: T; // Data should contain the actual payload
};

export type ErrorResponse = {
  success: false; // Success is false for error response
  error: {
    message: string;
  };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export function checkOtp(data: {
  email: string;
  otp: string;
}): Promise<ApiResponse<{ token: string }>> {
  return api<{ token: string }>({
    url: `/auth/otp-check`,
    method: "POST",
    data,
  });
}

export function changePassword(data: { new_password: string }, token?: string) {
  return api({
    url: `/auth/change-password`,
    method: "POST",
    data,
    config: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  });
}

// export function changePassword(data: { email: string; new_password: string ; token: string}) {
//   return apiLogin<ChangeResponse>({
//     url: `/auth/change-password`,
//     method: "POST",
//     data,
//   });
// }

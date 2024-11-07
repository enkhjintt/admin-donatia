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

export function loginRequest(data: { identifier: string; password: string }) {
  console.log("login request calling with this data", data);

  return apiLogin<LoginResponse>({
    url: `/auth/login`,
    method: "POST",
    data,
  });
}

export function changePassword(data: { phone: string; new_password: string }) {
  return api({
    url: `/auth/user-password`,
    method: "PUT",
    data,
  });
}

export function otpRequest(data: { phone: string }) {
  return api({
    url: `/auth/otp`,
    method: "POST",
    data,
  });
}

export function checkOtp(data: { phone: string; otp: string }) {
  return api({
    url: `/auth/check-otp`,
    method: "POST",
    data,
  });
}

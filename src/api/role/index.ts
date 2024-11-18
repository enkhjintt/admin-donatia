import { api } from "../api";

export type RoleItemResponse = {
  meaning: any;
  client: {
    code: string;
    created_at: string;
    created_by_id: number;
    deleted_at: string;
    id: number;
    name: string;
    updated_at: string;
    updated_by_id: number;
  };
  client_id: number;
  code: string;
  created_at: string;
  id: number;
  name: string;
  permissions: string[];
  status: string;
  updated_by_id: number;
};

export type RoleType = {
  id: number;
  code: string;
  client_id: number;
  client: {
    id: number;
    code: string;
    name: string;
  };
  name: string;
  permissions: string[];
  status: string;
  created_at: string;
};
export function DeleteRole(id: number | undefined) {
  return api({
    url: `/role/${id}`,
    method: "DELETE",
  });
}


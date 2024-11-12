import { api } from "@/api/api";

export type ProjectFeeResponse = {
  id: number;
  honog: string;
  dun: number;
  //busad type
};

export function CreateProjectFee(data: ProjectFeeResponse) {
  return api({ url: "/tusul/huraamj/create", method: "POST", data });
}

export function UpdateProjectFee(id: number, data: ProjectFeeResponse) {
  return api({ url: `/tusul/huraamj/update/${id}`, method: "PUT", data });
}

export function DeleteProjectFee(id: number | undefined) {
  return api({
    url: `/tusul/huraamj/delete/${id}`,
    method: "DELETE",
  });
}

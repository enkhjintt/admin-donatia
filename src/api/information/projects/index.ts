import { api } from "@/api/api";

export type ProjectResponse = {
  id: number;
  status: string;
//busad type
};

export function CreateProject(data: ProjectResponse) {
  return api({ url: "/project", method: "POST", data });
}

export function UpdateProject(id: number, data: ProjectResponse) {
  return api({ url: `/project/${id}`, method: "PUT", data });
}

export function DeleteProject(id: number | undefined) {
  return api({
    url: `/project/${id}`,
    method: "DELETE",
  });
}

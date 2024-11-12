import { api } from "@/api/api";

export type ProjectStatusResponse = {
  id: number;
  ner: string;
  tailbar: string;
  //busad type
};

export function CreateProjectStatus(data: ProjectStatusResponse) {
  return api({ url: "/tusul/tuluv/create", method: "POST", data });
}

export function UpdateProjectStatus(id: number, data: ProjectStatusResponse) {
  return api({ url: `/tusul/tuluv/update/${id}`, method: "PUT", data });
}

export function DeleteProjectStatus(id: number | undefined) {
  return api({
    url: `/tusul/tuluv/delete/${id}`,
    method: "DELETE",
  });
}

import { api } from "@/api/api";

export type ProjectClassResponse = {
  id: number;
  ner: string;
  //busad type
};

export function CreateProjectClass(data: ProjectClassResponse) {
  return api({ url: "/tusul/angilal/create", method: "POST", data });
}

export function UpdateProjectClass(id: number, data: ProjectClassResponse) {
  return api({ url: `/tusul/angilal/update/${id}`, method: "PUT", data });
}

export function DeleteProjectClass(id: number | undefined) {
  return api({
    url: `/tusul/angilal/delete/${id}`,
    method: "DELETE",
  });
}

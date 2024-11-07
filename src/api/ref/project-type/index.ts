import { api } from "@/api/api";

export type ProjectTypeResponse = {
  id: number;
  ner: string;
  //busad type
};

export function CreateProjectType(data: ProjectTypeResponse) {
  return api({ url: "/tusul/angilal/create", method: "POST", data });
}

export function UpdateProjectType(id: number, data: ProjectTypeResponse) {
  return api({ url: `/tusul/angilal/update/${id}`, method: "PUT", data });
}

export function DeleteProjectType(id: number | undefined) {
  return api({
    url: `/tusul/angilal/delete/${id}`,
    method: "DELETE",
  });
}

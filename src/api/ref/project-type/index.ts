import { api } from "@/api/api";

export type ProjectTypeResponse = {
  id: number;
  ner: string;
  shimtgel_huvi: number;
  //busad type
};

export function CreateProjectType(data: ProjectTypeResponse) {
  return api({ url: "/tusul/turul/create", method: "POST", data });
}

export function UpdateProjectType(id: number, data: ProjectTypeResponse) {
  return api({ url: `/tusul/turul/update/${id}`, method: "PUT", data });
}

export function DeleteProjectType(id: number | undefined) {
  return api({
    url: `/tusul/turul/delete/${id}`,
    method: "DELETE",
  });
}

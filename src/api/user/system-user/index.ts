import { api } from "@/api/api";

export function addSystemUser(data: FormData) {
  return api({
    url: `/system/user`,
    method: "POST",
    data,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
}
// export function deleteUser(id: number) {
//   return api({
//     url: `system/user/${id}/soft-delete`,
//     method: "POST",
//   });
// }
export function deleteUser(id: number) {
  return api({
    url: `system/user/${id}`,
    method: "DELETE",
  });
}
export function editSystemUser(data: FormData, id: number) {
  return api({
    url: `/system/user/${id}`,
    method: "PUT",
    data,
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
}

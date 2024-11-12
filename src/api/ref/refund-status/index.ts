import { api } from "@/api/api";

export type RefundStatusResponse = {
  id: number;
  ner: string;
  butsaalt_tuluv_ner: string;
};

export function CreateRefundStatus(data: RefundStatusResponse) {
  return api({ url: "/butsaalt/tuluv/create", method: "POST", data });
}

export function UpdateRefundStatus(id: number, data: RefundStatusResponse) {
  return api({ url: `/butsaalt/tuluv/update/${id}`, method: "PUT", data });
}

export function DeleteRefundStatus(id: number | undefined) {
  return api({
    url: `/butsaalt/tuluv/delete/${id}`,
    method: "DELETE",
  });
}

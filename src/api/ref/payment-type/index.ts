import { api } from "@/api/api";

export type PaymentTypeResponse = {
  id: number;
  ner: string;
  tulbur_helber_ner: string;
};

export function CreatePaymentType(data: PaymentTypeResponse) {
  return api({ url: "/tulbur/helber/create", method: "POST", data });
}

export function UpdatePaymentType(id: number, data: PaymentTypeResponse) {
  return api({ url: `/tulbur/helber/update/${id}`, method: "PUT", data });
}

export function DeletePaymentType(id: number | undefined) {
  return api({
    url: `/tulbur/helber/delete/${id}`,
    method: "DELETE",
  });
}

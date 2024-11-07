import { api } from "@/api/api";

export type PaymentStatusResponse = {
  id: number;
  ner: string;

};

export function CreatePaymentStatus(data: PaymentStatusResponse) {
  return api({ url: "/tulbur/tuluv/create", method: "POST", data });
}

export function UpdatePaymentStatus(id: number, data: PaymentStatusResponse) {
  return api({ url: `/tulbur/tuluv/update/${id}`, method: "PUT", data });
}

export function DeletePaymentStatus(id: number | undefined) {
  return api({
    url: `/tulbur/tuluv/delete/${id}`,
    method: "DELETE",
  });
}

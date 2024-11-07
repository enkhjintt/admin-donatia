import { api } from "@/api/api";

export type BankTypeResponse = {
  id: number;
  bank_turul_ner: string;
  //busad type
};

export function CreateBankType(data: BankTypeResponse) {
  return api({ url: "/bank/turul/create", method: "POST", data });
}

export function UpdateBankType(id: number, data: BankTypeResponse) {
  return api({ url: `/bank/turul/update/${id}`, method: "PUT", data });
}

export function DeleteBankType(id: number | undefined) {
  return api({
    url: `/bank/turul/delete/${id}`,
    method: "DELETE",
  });
}

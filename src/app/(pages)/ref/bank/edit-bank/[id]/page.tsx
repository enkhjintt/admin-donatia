import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

import EditBankTypeForm from "@/components/(routes)/ref/bank/edit/edit-bank-form";


export const metadata: Metadata = {
  title: "Банкны төрөл | Засах",
}
type IProps = {
  params: { id: number };
};
const BankTypeEditPage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Банкны төрөл"
          links={[
            {
              label: "Үндсэн лавлах",
              href: "#",
            },
            {
              label: "Банкны төрөл",
              href: "/ref/bank",
            },
            {
              label: "Засах",
              noLink: true,
              href: "#",
            },
          ]}
          
        />
        <EditBankTypeForm id={id} />
      </SectionLayout>
    </>
  );
};

export default BankTypeEditPage;

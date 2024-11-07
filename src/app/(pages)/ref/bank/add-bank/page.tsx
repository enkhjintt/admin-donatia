import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddBankTypeForm from "@/components/(routes)/ref/bank/add/add-bank-form";

export const metadata: Metadata = {
  title: "Банкны төрөл | Нэмэх",
};
const BankTypeEditPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Банкны төрөл"
          links={[
            {
              label: "Банкны төрөл",
              href: "/ref/bank",
            },
            {
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddBankTypeForm />
      </SectionLayout>
    </>
  );
};

export default BankTypeEditPage;

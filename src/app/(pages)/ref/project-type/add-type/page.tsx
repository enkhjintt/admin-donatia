import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddBankTypeForm from "@/components/(routes)/ref/bank/add/add-bank-form";
import AddProjectTypeForm from "@/components/(routes)/ref/project-type/add/add-project-type-form";

export const metadata: Metadata = {
  title: "Төслийн төрөл | Нэмэх",
};
const AddProjectTypePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн төрөл"
          links={[
            {
              label: "Төслийн төрөл",
              href: "/ref/bank",
            },
            {
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddProjectTypeForm />
      </SectionLayout>
    </>
  );
};

export default AddProjectTypePage;

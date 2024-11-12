import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddProjectFeeForm from "@/components/(routes)/ref/project-fee/add/add-project-fee-form";

export const metadata: Metadata = {
  title: "Төслийн хураамж | Нэмэх",
};
const AddProjectFeePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн хураамж"
          links={[
            {
              label: "Төслийн хураамж",
              href: "/ref/project-fee",
            },
            {
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddProjectFeeForm />
      </SectionLayout>
    </>
  );
};

export default AddProjectFeePage;

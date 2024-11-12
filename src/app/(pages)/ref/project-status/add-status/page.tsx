import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddProjectStatusForm from "@/components/(routes)/ref/project-status/add/add-project-status-form";


export const metadata: Metadata = {
  title: "Төслийн төлөв | Нэмэх",
};
const AddProjectStatusPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн төлөв"
          links={[
            {
              label: "Төслийн төлөв",
              href: "/ref/project-status",
            },
            {
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddProjectStatusForm />
      </SectionLayout>
    </>
  );
};

export default AddProjectStatusPage;

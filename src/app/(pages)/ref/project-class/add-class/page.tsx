import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddProjectClassForm from "@/components/(routes)/ref/project-class/add/add-project-class-form";



export const metadata: Metadata = {
  title: "Төслийн ангилал | Нэмэх",
};
const AddProjectClassPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн ангилал"
          links={[
            {
              label: "Төслийн ангилал",
              href: "/ref/project-class",
            },
            {
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddProjectClassForm />
      </SectionLayout>
    </>
  );
};

export default AddProjectClassPage;

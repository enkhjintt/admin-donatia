import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import HomeForm from "@/components/(routes)/home/home-form";
import NewProjectForm from "@/components/(routes)/dashboard/new-project/new-project-form";

export const metadata: Metadata = {
  title: "Шинэ төслүүд | Дашбоард",
};

const NewProjectPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Шинэ төслийн статистик мэдээлэл"
          links={[
            {
              label: "Дашбоард",
              href: "#",
            },
            {
              label: "Шинэ төслүүд",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <NewProjectForm />
      </SectionLayout>
    </>
  );
};

export default NewProjectPage;

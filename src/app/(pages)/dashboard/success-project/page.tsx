import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import SuccessProjectForm from "@/components/(routes)/dashboard/success-project/success-project-form";

export const metadata: Metadata = {
  title: "Амжилттай төсөл | Дашбоард",
};

const SuccessProjectPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader

          title="Амжилттай төслийн статистик мэдээлэл"

          links={[
            {
              label: "Дашбоард",
              href: "#",
            },
            {
              label: "Амжилттай төсөл",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <SuccessProjectForm/>
      </SectionLayout>
    </>
  );
};

export default SuccessProjectPage;

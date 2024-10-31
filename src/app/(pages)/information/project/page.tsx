import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import ProjectTable from "@/components/(routes)/information/project/project-table";

export const metadata: Metadata = {
  title: "Төсөл | Үндсэн мэдээлэл",
};

const InfoProjectPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төсөл"
          links={[
            {
              label: "Үндсэн мэдээлэл",
              href: "#",
            },
            {
              label: "Төсөл",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <ProjectTable />
      </SectionLayout>
    </>
  );
};

export default InfoProjectPage;

import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

export const metadata: Metadata = {
  title: "Төсөл | Дашбоард",
};

const DashboardPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төсөл"
          links={[
            {
              label: "Дашбоард",
              noLink: true,
              href: "#",
            },
            {
              label: "Төсөл",
              noLink: true,
              href: "#",
            },
          ]}
        />
        hi
      </SectionLayout>
    </>
  );
};

export default DashboardPage;

import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import RoleTable from "@/components/(routes)/settings/role/role-table";

export const metadata: Metadata = {
  title: "Эрхийн тохиргоо | Хэрэглэгч",
};

const RolesPage = () => {
  return (
    <SectionLayout>
      <PageHeader
        hidden={false}
        title="Эрхийн тохиргоо"
        links={[
          {
            label: "Хэрэглэгч",
            href: "#",
          },
          {
            label: "Эрхийн тохиргоо",
            href: "#",
            noLink: true,
          },
        ]}
      />

      <RoleTable />
    </SectionLayout>
  );
};

export default RolesPage;

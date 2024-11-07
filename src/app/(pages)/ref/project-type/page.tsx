import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import BankTypeTable from "@/components/(routes)/ref/bank/bank-type-table";
import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import ProjectTypeTable from "@/components/(routes)/ref/project-type/project-type-table";

export const metadata: Metadata = {
  title: "Төсөл",
};

const ProjectTypePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төсөл ангилал"
          links={[
            {
              label: "Төсөл ангилал",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/project-type/add-type"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Төсөл ангилал нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <ProjectTypeTable />
      </SectionLayout>
    </>
  );
};

export default ProjectTypePage;

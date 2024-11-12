import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

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
          title="Төсөл төрөл"
          links={[
            {
              label: "Төсөл төрөл",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/project-type/add-type"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Төсөл төрөл нэмэх"
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

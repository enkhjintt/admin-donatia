import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import ProjectClassTable from "@/components/(routes)/ref/project-class/project-class-table";


export const metadata: Metadata = {
  title: "Төсөл",
};

const ProjectClassPage = () => {
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
            <Link href={"/ref/project-class/add-class"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Төсөл ангилал нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <ProjectClassTable />
      </SectionLayout>
    </>
  );
};

export default ProjectClassPage;

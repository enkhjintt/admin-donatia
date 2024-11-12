import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import ProjectFeeTable from "@/components/(routes)/ref/project-fee/project-fee-table";

export const metadata: Metadata = {
  title: "Төсөл",
};

const ProjectFeePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн хураамж"
          links={[
            {
              label: "Төслийн хураамж",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/project-fee/add-fee"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Төслийн хураамж нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <ProjectFeeTable />
      </SectionLayout>
    </>
  );
};

export default ProjectFeePage;

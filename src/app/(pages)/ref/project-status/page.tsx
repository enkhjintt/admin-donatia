import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import ProjectStatusTable from "@/components/(routes)/ref/project-status/project-status-table";


export const metadata: Metadata = {
  title: "Төсөл",
};

const ProjectStatusPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төсөл төлөв"
          links={[
            {
              label: "Үндсэн лавлах",
              href: "#",
            },
            {
              label: "Төсөл төлөв",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/project-status/add-status"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Төсөл төлөв нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <ProjectStatusTable />
      </SectionLayout>
    </>
  );
};

export default ProjectStatusPage;

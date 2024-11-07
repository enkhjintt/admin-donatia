import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import SystemUserTable from "@/components/(routes)/information/system-user/system-user-table";

export const metadata: Metadata = {
  title: "Систем Хэрэглэгч | Үндсэн мэдээлэл",
};

const SystemUsersPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          hidden={false}
          title="Систем хэрэглэгч"
          links={[
            {
              label: "Үндсэн мэдээлэл",
              href: "/information/system-user",
            },
            {
              label: "Систем хэрэглэгч",
              href: "#",
              noLink: true,
            },
          ]}
          button={
            <Link
              className="flex"
              href={"/information/system-user/add-system-user"}
            >
              <Button
                className="w-full"
                variant="primary"
                placeholder="Хэрэглэгч нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <SystemUserTable />
      </SectionLayout>
    </>
  );
};

export default SystemUsersPage;

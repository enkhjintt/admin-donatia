import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import ViewSystemUserForm from "@/components/(routes)/information/system-user/view/view-system-user";
import Link from "next/link";
import Button from "@/components/button";
import PenIcon from "@/components/icons/pen-icon";

export const metadata: Metadata = {
  title: "Бүртгэл харах | Үндсэн мэдээлэл",
};
type IProps = {
  params: { id: number };
};

const ViewSystemUserPage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Бүртгэл харах"
          links={[
            {
              label: "Үндсэн мэдээлэл",
              href: "#",
            },
            {
              label: "Систем хэрэглэгч",
              href: "/information/system-user",
            },
            {
              label: "Бүртгэл харах",
              href: "#",
              noLink: true,
            },
          ]}
          button={
            <Link href={`/information/system-user/edit-system-user/${id}`}>
              <Button
                variant="primary"
                placeholder="Засах"
                icon={<PenIcon />}
                className="w-40"
              />
            </Link>
          }
        />
        <ViewSystemUserForm id={id} />
      </SectionLayout>
    </>
  );
};

export default ViewSystemUserPage;

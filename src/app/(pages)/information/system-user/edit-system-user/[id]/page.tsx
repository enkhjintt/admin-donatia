import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditSystemUserForm from "@/components/(routes)/information/system-user/edit/edit-system-user";

export const metadata: Metadata = {
  title: "Бүртгэл засах | Үндсэн мэдээлэл",
};
type IProps = {
  params: { id: number };
};

const EditSystemUserPage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Бүртгэл засах"
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
              label: "Бүртгэл засах",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <EditSystemUserForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditSystemUserPage;

import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddSystemUserForm from "@/components/(routes)/information/system-user/add/add-system-user";


export const metadata: Metadata = {
  title: "Бүртгэл нэмэх | Үндсэн мэдээлэл",
};

const SystemUserAddPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Бүртгэл нэмэх"
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
              label: "Бүртгэл нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddSystemUserForm />
      </SectionLayout>
    </>
  );
};

export default SystemUserAddPage;

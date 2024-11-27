import { Metadata } from "next";

import SectionLayout from "@/components/section-layout";
import EditProjectForm from "@/components/(routes)/information/project/edit/edit-project-form";
import PageHeader from "@/components/page-header";

export const metadata: Metadata = {
  title: "Төслийн дэлгэрэнггй",
};

type IProps = {
  params: { id: number };
};

const EditProjectPage = ({ params }: IProps) => {
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
              label: "Төсөл",
              href: "/information/project",
            },
            {
              label: "Бүртгэл засах",
              href: "#",
            },
          ]}
        />
        <EditProjectForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditProjectPage;

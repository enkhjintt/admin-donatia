import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditProjectTypeForm from "@/components/(routes)/ref/project-type/edit/edit-project-type-form";



export const metadata: Metadata = {
  title: "Төслийн төрөл | Засах",
}
type IProps = {
  params: { id: number };
};
const EditProjectTypePage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн төрөл"
          links={[
            {
              label: "Үндсэн лавлах",
              href: "#",
            },
            {
              label: "Төслийн төрөл",
              href: "/ref/project-type",
            },
            {
              label: "Засах",
              href: "#",
              noLink: true,
            },
          ]}
          
        />
        <EditProjectTypeForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditProjectTypePage;

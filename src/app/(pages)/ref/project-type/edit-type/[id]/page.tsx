import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditProjectTypeForm from "@/components/(routes)/ref/project-type/edit/edit-project-type-form";


export const metadata: Metadata = {
  title: "Төслийн ангилал | Засах",
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
          title="Төслийн ангилал"
          links={[
            {
              label: "Төслийн ангилал",
              noLink: true,
              href: "/ref/bank",
            },
            {
              label: "Засах",
              href: "#",
            },
          ]}
          
        />
        <EditProjectTypeForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditProjectTypePage;

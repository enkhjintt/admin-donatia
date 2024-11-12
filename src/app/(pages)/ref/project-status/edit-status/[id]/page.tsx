import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditProjectStatusForm from "@/components/(routes)/ref/project-status/edit/edit-project-type-form";




export const metadata: Metadata = {
  title: "Төслийн төлөв | Засах",
}
type IProps = {
  params: { id: number };
};
const EditProjectStatusPage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн төлөв"
          links={[
            {
              label: "Төслийн төлөв",
              href: "/ref/project-status",
            },
            {
              label: "Засах",
              href: "#",
              noLink: true,
            },
          ]}
          
        />
        <EditProjectStatusForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditProjectStatusPage;

import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditProjectClassForm from "@/components/(routes)/ref/project-class/edit/edit-project-class-form";



export const metadata: Metadata = {
  title: "Төслийн ангилал | Засах",
}
type IProps = {
  params: { id: number };
};
const EditProjectClassPage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн ангилал"
          links={[
            {
              label: "Үндсэн лавлах",
              href: "#",
            },
            {
              label: "Төслийн ангилал",
              href: "/ref/bank",
            },
            {
              label: "Засах",
              href: "#",
              noLink: true,
            },
          ]}
          
        />
        <EditProjectClassForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditProjectClassPage;

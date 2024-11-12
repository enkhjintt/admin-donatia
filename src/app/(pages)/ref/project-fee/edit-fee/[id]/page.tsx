import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditProjectFeeForm from "@/components/(routes)/ref/project-fee/edit/edit-project-fee-form";

export const metadata: Metadata = {
  title: "Төслийн хураамж | Засах",
};
type IProps = {
  params: { id: number };
};
const EditProjectFeePage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төслийн хураамж"
          links={[
            {
              label: "Төслийн хураамж",
              href: "/ref/project-fee",
            },
            {
              label: "Засах",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <EditProjectFeeForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditProjectFeePage;

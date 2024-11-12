import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditRefundStatusForm from "@/components/(routes)/ref/refund-status/edit/edit-refund-status-form";


export const metadata: Metadata = {
  title: "Буцаалтын төлөв | Засах",
};
type IProps = {
  params: { id: number };
};
const EditRefundStatusPage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Буцаалтын төлөв"
          links={[
            {
              label: "Буцаалтын төлөв",
              href: "/ref/bank",
            },
            {
              label: "Засах",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <EditRefundStatusForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditRefundStatusPage;

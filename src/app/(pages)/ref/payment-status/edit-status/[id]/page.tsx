import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditPaymentStatusForm from "@/components/(routes)/ref/payment-status/edit/edit-payment-status-form";

export const metadata: Metadata = {
  title: "Төлбөрийн төлөв | Засах",
};
type IProps = {
  params: { id: number };
};
const EditPaymentStatusPage = ({ params }: IProps) => {
  const id = params.id;
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төлбөрийн төлөв"
          links={[
            {
              label: "Төлбөрийн төлөв",
          
              href: "/ref/bank",
            },
            {
              label: "Засах",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <EditPaymentStatusForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditPaymentStatusPage;

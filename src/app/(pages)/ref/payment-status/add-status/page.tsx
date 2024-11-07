import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddPaymentStatusForm from "@/components/(routes)/ref/payment-status/add/add-payment-status-form";


export const metadata: Metadata = {
  title: "Төлбөрийн төлөв | Нэмэх",
};
const AddPaymentStatusPage = () => {
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
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddPaymentStatusForm />
      </SectionLayout>
    </>
  );
};

export default AddPaymentStatusPage;

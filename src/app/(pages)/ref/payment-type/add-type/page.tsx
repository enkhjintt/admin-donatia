import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddPaymentTypeForm from "@/components/(routes)/ref/payment-type/add/add-payment-type-form";

export const metadata: Metadata = {
  title: "Төлбөрийн хэлбэр | Нэмэх",
};
const AddPaymentTypePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төлбөрийн хэлбэр"
          links={[
            {
              label: "Үндсэн лавлах",
              href: "#",
            },
            {
              label: "Төлбөрийн хэлбэр",
              href: "/ref/bank",
            },
            {
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddPaymentTypeForm />
      </SectionLayout>
    </>
  );
};

export default AddPaymentTypePage;

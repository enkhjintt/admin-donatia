import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import EditPaymentTypeForm from "@/components/(routes)/ref/payment-type/edit/edit-payment-type-form";


export const metadata: Metadata = {
  title: "Төлбөрийн хэлбэр | Засах",
};
type IProps = {
  params: { id: number };
};
const EditPaymentTypePage = ({ params }: IProps) => {
  const id = params.id;
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
              label: "Засах",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <EditPaymentTypeForm id={id} />
      </SectionLayout>
    </>
  );
};

export default EditPaymentTypePage;

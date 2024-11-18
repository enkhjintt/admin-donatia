import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import AddRefundStatusForm from "@/components/(routes)/ref/refund-status/add/add-refund-status-form";



export const metadata: Metadata = {
  title: "Буцаалтын төлөв | Нэмэх",
};
const AddRefundStatusPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Буцаалтын төлөв"
          links={[
            {
              label: "Үндсэн лавлах",
              href: "#",
            },
            {
              label: "Буцаалтын төлөв",
              href: "/ref/bank",
            },
            {
              label: "Нэмэх",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <AddRefundStatusForm />
      </SectionLayout>
    </>
  );
};

export default AddRefundStatusPage;

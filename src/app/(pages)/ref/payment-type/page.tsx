import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import BankTypeTable from "@/components/(routes)/ref/bank/bank-type-table";
import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import PaymentTypeTable from "@/components/(routes)/ref/payment-type/payment-type-table";

export const metadata: Metadata = {
  title: "Төлбөрийн хэлбэр",
};

const PaymentTypePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төлбөрийн хэлбэр"
          links={[
            {
              label: "Төлбөрийн хэлбэр",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/payment-type/add-type"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Төлбөрийн хэлбэр нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <PaymentTypeTable />
      </SectionLayout>
    </>
  );
};

export default PaymentTypePage;

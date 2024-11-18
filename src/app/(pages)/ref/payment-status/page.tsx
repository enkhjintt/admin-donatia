import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import BankTypeTable from "@/components/(routes)/ref/bank/bank-type-table";
import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import PaymentStatusTable from "@/components/(routes)/ref/payment-status/payment-status-table";

export const metadata: Metadata = {
  title: "Төлбөрийн төлөв",
};

const PaymentStatusPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Төлбөрийн төлөв"
          links={[
            {
              label: "Үндсэн лавлах",
              href: "#",
            },
            {
              label: "Төлбөрийн төлөв",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/payment-status/add-status"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Төлбөрийн төлөв нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <PaymentStatusTable />
      </SectionLayout>
    </>
  );
};

export default PaymentStatusPage;

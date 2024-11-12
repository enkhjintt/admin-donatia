import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";
import RefundStatusTable from "@/components/(routes)/ref/refund-status/refund-status-table";


export const metadata: Metadata = {
  title: "Буцаалтын төлөв",
};

const RefundStatusPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Буцаалтын төлөв"
          links={[
            {
              label: "Буцаалтын төлөв",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/refund-status/add-status"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Буцаалтын төлөв нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <RefundStatusTable />
      </SectionLayout>
    </>
  );
};

export default RefundStatusPage;

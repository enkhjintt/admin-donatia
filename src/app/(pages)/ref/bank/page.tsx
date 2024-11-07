import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import BankTypeTable from "@/components/(routes)/ref/bank/bank-type-table";
import Link from "next/link";
import Button from "@/components/button";
import PlusIcon from "@/components/icons/plus-icon";

export const metadata: Metadata = {
  title: "Банк",
};

const BankTypePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Банк"
          links={[
            {
              label: "Банк",
              noLink: true,
              href: "#",
            },
          ]}
          button={
            <Link href={"/ref/bank/add-bank"}>
              <Button
                variant="primary"
                className="w-56"
                placeholder="Банкны төрөл нэмэх"
                icon={<PlusIcon />}
              />
            </Link>
          }
        />
        <BankTypeTable />
      </SectionLayout>
    </>
  );
};

export default BankTypePage;

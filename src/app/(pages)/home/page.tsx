import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

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
        />
        hoomeee
      </SectionLayout>
    </>
  );
};

export default BankTypePage;

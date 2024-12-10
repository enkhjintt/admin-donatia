import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import YearIncomeTable from "@/components/(routes)/report/year-income/year-income-table";

export const metadata: Metadata = {
  title: "1 жилийн орлогын тайлан | Тайлан",
};

const YearIncomePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="1 жилийн орлогын тайлан"
          links={[
            {
              label: "Тайлан",
              href: "#",
            },
            {
              label: "1 жилийн орлогын тайлан",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <YearIncomeTable />
      </SectionLayout>
    </>
  );
};

export default YearIncomePage;

import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import FeeIncomeTable from "@/components/(routes)/report/fee-income/fee-income-table";

export const metadata: Metadata = {
  title: "Үйлчилгээний хураамжийн орлогын тайлан | Тайлан",
};

const SuccessProjectPage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Үйлчилгээний хураамжийн орлогын тайлан"
          links={[
            {
              label: "Тайлан",
              href: "#",
            },
            {
              label: "Үйлчилгээний хураамжийн орлогын тайлан",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <FeeIncomeTable />
      </SectionLayout>
    </>
  );
};

export default SuccessProjectPage;

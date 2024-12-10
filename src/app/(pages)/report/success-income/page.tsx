import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import SuccessProjectForm from "@/components/(routes)/dashboard/success-project/success-project-form";
import SuccessIncomeTable from "@/components/(routes)/report/success-income/success-income-table";

export const metadata: Metadata = {
  title: "Амжилттай төслийн орлогын тайлан | Тайлан",
};

const FeeIncomePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Амжилттай төслийн орлогын тайлан"
          links={[
            {
              label: "Тайлан",
              href: "#",
            },
            {
              label: "Амжилттай төслийн орлогын тайлан",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <SuccessIncomeTable />
      </SectionLayout>
    </>
  );
};

export default FeeIncomePage;

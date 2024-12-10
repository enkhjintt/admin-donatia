import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import HomeForm from "@/components/(routes)/home/home-form";

export const metadata: Metadata = {
  title: "Бүх төсөл | Нүүр хуудас",
};

const BankTypePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader

          title="Бүх төслийн статистик мэдээлэл (бүтэн жилээр)"
          links={[
            {
              label: "Нүүр хуудас",
              href: "#",
            },
            {
              label: "Бүх төсөл",
              noLink: true,
              href: "#",
            },
          ]}
        />

        <HomeForm />

      </SectionLayout>
    </>
  );
};

export default BankTypePage;

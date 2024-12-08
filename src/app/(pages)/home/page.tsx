import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import HomeForm from "@/components/(routes)/home/home-form";

export const metadata: Metadata = {
  title: "Нүүр хуудас",
};

const BankTypePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Нүүр хуудас"
          links={[
            {
              label: "Нийт төслүүд",
              noLink: true,
              href: "#",
            },
          ]}
        />
        <HomeForm/>
      </SectionLayout>
    </>
  );
};

export default BankTypePage;

import { Metadata } from "next";

import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";

export const metadata: Metadata = {
  title: "Нүүр хуудас",
};

const HomePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          title="Нүүр хуудас"
          links={[
            {
              label: "Нүүр хуудас",
              noLink: true,
              href: "#",
            },
          ]}
        />
        hi
      </SectionLayout>
    </>
  );
};

export default HomePage;
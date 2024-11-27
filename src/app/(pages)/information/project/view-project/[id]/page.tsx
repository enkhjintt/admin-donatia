import { Metadata } from "next";

import SectionLayout from "@/components/section-layout";
import ViewDonation from "@/components/(routes)/information/project/view/view-donation";



export const metadata: Metadata = {
  title: "Төслийн дэлгэрэнггй",
};

type IProps = {
  params: { id: number };
};

const EditDevicePage = ({ params }: IProps) => {
  const id = params.id;

  return (
    <>
      <SectionLayout>
        <ViewDonation id={id} />
      </SectionLayout>
    </>
  );
};

export default EditDevicePage;

import { Metadata } from "next";
import PageHeader from "@/components/page-header";
import SectionLayout from "@/components/section-layout";
import UserProfileForm from "@/components/(routes)/information/system-user/profile/user-profile";


export const metadata: Metadata = {
  title: "Хувийн мэдээлэлч | Профайл",
};

const ProfilePage = () => {
  return (
    <>
      <SectionLayout>
        <PageHeader
          hidden={false}
          title="Хувийн мэдээлэл"
          links={[
            {
              label: "Профайл",
              href: "",
            },
            {
              label: "Хувийн мэдээлэл",
              href: "#",
              noLink: true,
            },
          ]}
        />
        <UserProfileForm />
      </SectionLayout>
    </>
  );
};

export default ProfilePage;

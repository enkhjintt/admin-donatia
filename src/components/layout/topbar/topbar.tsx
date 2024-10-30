
// import TopbarNotification from "./topbar-notification";

import ProfileDropdown from "@/components/layout/topbar/profile-item";

type IProps = {};

const TopBar: React.FC<IProps> = ({}) => {
  return (
    <div className="w-full h-20 bg-base-white px-8 py-6">
      <div className="flex gap-2 justify-end ">
        {/* <TopbarNotification /> */}

        <ProfileDropdown />
      </div>
    </div>
  );
};

export default TopBar;

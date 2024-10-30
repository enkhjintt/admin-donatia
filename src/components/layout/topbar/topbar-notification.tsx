"use client";

import { useEffect, useState } from "react";
// import { useProfile } from "@/hooks/use-profile";
import Dropdown from "@/components/dropdown";
import Button from "@/components/button";
import BellIcon from "@/components/icons/bell-icon";
// import { getFCMToken } from "@/utils/firebase";
// import { sendFCMToken } from "@/api/notification";

type IProps = {};



const TopbarNotification: React.FC<IProps> = ({}) => {
  // const { data: profile } = useProfile();


  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dropdown
      header={
        <p className="mr-10 px-4 py-2 font-semibold text-sm text-gray-700">
          Мэдэгдлүүд
        </p>
      }
      onOpenChange={(open) => setOpen(open)}
      menu={{
        items: [
          {
            key: 1,
            label:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cupiditate explicabo sed autem ipsam velit non aperiam nisi laudantium dolorum!",
          },
          {
            key: 2,
            label:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cupiditate explicabo sed autem ipsam velit non aperiam nisi laudantium dolorum!",
          },
        ],
        id: "df",
      }}
    >
      <Button
        fit
        variant="none"
        icon={<BellIcon />}
        padding="secondary"
        className="relative border-none shadow-none text-gray-600 hover:text-success-normal"
        suffix={
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full font-semibold text-base-white text-xs bg-error-normal ">
            {1}
          </span>
        }
      />
    </Dropdown>
  );
};

export default TopbarNotification;

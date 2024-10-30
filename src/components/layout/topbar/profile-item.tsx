"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

import UserIcon from "@/components/icons/user-icon";

import { signOut } from "next-auth/react";

const ProfileDropdown: React.FC = () => {
  // const { data: user } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/information/system-user/profile`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="2" onClick={handleProfileClick}>
        <div className="flex">
          <UserIcon size="small" />
          <span className="px-3 ">Профайл</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={async () => {
          await signOut({ redirect: true, callbackUrl: "/" });
        }}
      >
        <LogoutOutlined />
        <span className="px-3 ">Гарах</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu as any}
      trigger={["click"]}
      onOpenChange={(flag) => setIsOpen(flag)}
      open={isOpen}
    >
      <div className="dropdown-toggle h-9 border border-gray-300 border-y-0 border-r-0 pl-2 cursor-pointer dark:text-gray-900">
        {/* <div className="flex flex-row gap-2 items-center">
          <div>
            <div className="text-sm text-right font-semibold">
              {user?.org_user?.User?.first_name}
            </div>
            <div className="text-sm">{user?.org_user?.Organization?.name}</div>
          </div>
          <Avatar size={36} src={user?.org_user?.User?.profile_picture_url}>
            {user?.org_user?.User?.first_name?.charAt(0)}
          </Avatar>
        </div> */}
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;

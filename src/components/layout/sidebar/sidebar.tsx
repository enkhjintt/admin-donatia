import { getSession, signOut } from "next-auth/react";
import SubMenuList from "./sub-menu-list";
import Button from "@/components/button";
import Title from "@/components/title";

import Link from "next/link";
import HomeIcon from "@/components/icons/home-icon";
import DashboardIcon from "@/components/icons/dashboard-icon";
import InfoIcon from "@/components/icons/info-icon";
import ReportIcon from "@/components/icons/report-icon";
import TaskIcon from "@/components/icons/task-icon";
import SettingIcon from "@/components/icons/settings-icon";
import HelpIcon from "@/components/icons/help-icon";
import LogoIcon from "@/components/icons/logo-icon";
import MenuIcon from "@/components/icons/menu-icon";
import LoginIcon from "@/components/icons/login-icon";
import RefIcon from "@/components/icons/ref-icon";

type IProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export type IMenuList = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  code?: string;
  loading?: boolean;
  hidden?: boolean;
  items?: IMenuList[];
  inlineCollapsed?: boolean;
};

export type IMenuItems = IMenuList[];

const SideBar: React.FC<IProps> = ({ collapsed, toggleCollapsed }) => {
  // const { data: profile } = useProfile();
  //permission
  // const permissions = useSessionPermission();
  const items: IMenuItems = [
    {
      name: `Нүүр хуудас`,
      path: "/home",
      code: "AA",
      icon: <HomeIcon />,
    },
    {
      name: `Дашбоард`,
      path: "#",
      code: "AB",
      icon: <DashboardIcon color="fill-gray-600" />,
      items: [
        { name: "Төсөл", path: "/dashboard/project", icon: null },
        {
          name: "Санхүүжилт",
          path: "/dashboard/fundeamental",
          icon: null,
        },
      ],
    },
    {
      name: `Үндсэн мэдээлэл`,
      path: "#",
      code: "AC",
      icon: <InfoIcon />,
      items: [
        {
          name: `Систем хэрэглэгч`,
          path: "/information/system-user",
          icon: null,
        },
        {
          name: `Төсөл`,
          path: "/information/project",
          icon: null,
        },
        {
          name: `Урамшуулал`,
          path: "/information/",
          icon: null,
        },

        { name: `Хандив`, path: "/information/donation", icon: null },
      ],
    },
    {
      name: `Үндсэн лавлах`,
      path: "#",
      code: "AC",
      icon: <RefIcon />,
      items: [
        {
          name: `Төслийн ангилал `,
          path: "/ref/class",
          icon: null,
        },
        {
          name: `Төслийн төрөл `,
          path: "/ref/type",
          icon: null,
        },
        {
          name: `Төслийн төлөв  `,
          path: "/ref/status",
          icon: null,
        },
      ],
    },
    {
      name: `Тайлан`,
      path: "#",
      code: "AC",
      icon: <ReportIcon color="fill-gray-600" />,
      items: [
        {
          name: `Хэрэглэгчдийн тайлан`,
          path: "/report/users",
          icon: null,
        },
        {
          name: `Төслийн явцын тайлан`,
          path: "/report/project-progress",
          icon: null,
        },
        {
          name: `Төслийн тайлан`,
          path: "/report/projects",
          icon: null,
        },
      ],
    },
    {
      name: `Үйл ажиллагаа`,
      path: "#",
      code: "AB",
      icon: <TaskIcon color="fill-gray-600" />,
      items: [
        { name: `Төсөл шалгах`, path: "/tasks/project-check", icon: null },
      ],
    },

    {
      name: `Систем тохиргоо`,
      path: "#",
      code: "AF",
      icon: <SettingIcon color="fill-gray-600" />,
      items: [
        { name: `Эрхийн тохиргоо`, path: "/settings/role", icon: null },
        // { name: `Лог бүртгэл`, path: "/settings/log", icon: null },
      ],
    },
    {
      name: `Тусламж`,
      path: "#",
      code: "AF",
      icon: <HelpIcon color="fill-gray-600" />,
      loading: true,
    },
  ];

  return (
    <div
      className={`fixed z-10 inset-0 px-4 pb-10 h-screen border-gray-200 shadow-md overflow-y-auto overflow-x-hidden bg-base-white ${
        collapsed ? "sm:20 md:w-24" : "w-56 2xl:w-72"
      } `}
    >
      <nav className="w-full h-full flex flex-col gap-2 justify-between">
        <div>
          <div className="flex mt-6 mb-3 justify-between">
            {!collapsed && (
              <div>
                <Link href={"/"}>
                  <Button
                    variant="primary"
                    onClick={toggleCollapsed}
                    icon={<LogoIcon size="small" />}
                    className={collapsed ? "w-[48px] h-full rounded-lg " : ""}
                  />
                </Link>
              </div>
            )}
            <Button
              variant={collapsed ? "primary" : "link"}
              onClick={toggleCollapsed}
              icon={collapsed ? <LogoIcon size="small" /> : <MenuIcon />}
              className={
                collapsed ? " h-full rounded-lg " : "border-none w-8  "
              }
            />
          </div>

          <Title
            level={0}
            title="Үндсэн цэс"
            className="mx-2 mb-2 mt-5 text-gray-600"
            collapsed={collapsed}
          />

          <div className="flex flex-col w-full text-gray-600">
            {items.map((item) => (
              <SubMenuList
                key={item.name}
                icon={item.icon}
                name={collapsed ? "" : item.name}
                path={item.path}
                items={collapsed ? [] : item.items}
                code={item.code}
                loading={item.loading}
                inlineCollapsed={collapsed}
              />
            ))}
          </div>
        </div>

        <div
          onClick={async () => {
            localStorage.clear();

            const cacheKeys = await caches.keys();
            cacheKeys.forEach(async (key) => {
              await caches.delete(key);
            });

            await signOut({
              redirect: true,
              callbackUrl: "",
            });
          }}
          className="p-2 xl:mt-12 xl:pb-8 mt-14 w-full flex flex-col"
        >
          <Button
            padding="none"
            variant="icon"
            rounded={false}
            placeholder={collapsed ? "" : `Гарах`}
            icon={<LoginIcon />}
          />
        </div>
      </nav>
    </div>
  );
};

export default SideBar;

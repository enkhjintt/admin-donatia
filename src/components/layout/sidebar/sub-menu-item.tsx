import DotIcon from "@/components/icons/dot-icon";
import { Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IMenuList } from "./sidebar";

type IProps = IMenuList & {};

const SubMenuItem: React.FC<IProps> = ({ name, path, loading, hidden }) => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return pathname === path; // Exact match for active state
  }, [path, pathname]);

  return loading ? (
    <Tooltip
      title={"Хөгжүүлэгдэж байна"}
      className={`px-3 py-1 w-full flex gap-2 items-center rounded-lg`}
    >
      <span className={`${isActive ? "active-class" : ""}`}>
        {isActive ? (
          <div className="w-6 h-6">
            <div className="mx-auto w-1 h-full bg-gray-600" />
          </div>
        ) : (
          <DotIcon inverse />
        )}
      </span>

      <span
        className={`w-full font-medium text-xs mb-1 text-gray-600 hover:font-semibold ${
          isActive ? "font-semibold" : ""
        }`}
      >
        {name}
      </span>
    </Tooltip>
  ) : (
    !hidden && (
      <Link
        href={path}
        className={`px-3 py-1 w-full flex gap-2 items-center rounded-lg ${
          isActive ? "active-class" : ""
        }`}
      >
        <span className={`${isActive ? "active-class" : ""}`}>
          {isActive ? (
            <div className="w-6 h-6">
              <div className="mx-auto w-1 h-full bg-gray-600" />
            </div>
          ) : (
            <DotIcon inverse />
          )}
        </span>
        <span
          className={`w-full font-medium text-xs text-gray-600 space-y-1 mb-1 hover:font-semibold ${
            isActive ? "font-semibold" : ""
          }`}
        >
          {name}
        </span>
      </Link>
    )
  );
};

export default SubMenuItem;

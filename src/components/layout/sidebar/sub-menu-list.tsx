import React from "react";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { IMenuList } from "./sidebar";
import SubMenuItem from "./sub-menu-item";
import { Tooltip } from "antd";
import ChevronDownIcon from "@/components/icons/chevron-down-icon";
import ChevronRightIcon from "@/components/icons/chevron-right-icon";
import Link from "next/link";

type IProps = IMenuList & {};

const SubMenuList: React.FC<IProps> = ({
  icon,
  name,
  path,
  items,
  loading,
  hidden,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const pathname = usePathname();
  const trimLocaleFromPathname = (pathname: string) => {
    const parts = pathname.split("/");
    if (parts[1].length === 2) {
      // Assuming locale is always 2 characters long
      parts.splice(1, 1);
    }
    return parts.join("/");
  };

  const newPathname = trimLocaleFromPathname(pathname);

  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      return items.some((item) => pathname === item.path);
    }
    return pathname === path;
  }, [items, path, pathname]);

  useEffect(() => {
    if (isActive && items && items.length > 0) {
      setExpanded(true);
    }
  }, [isActive, items]);

  function handleExpand() {
    if (items && items.length > 0) {
      setExpanded((prev) => !prev);
    }
  }

  const style = `my-1 px-3 py-2 w-full flex items-center  justify-between rounded-lg hover:bg-base-white/20 ${
    isActive && "bg-gray-400"
  }`;

  const content = (
    <>
      <div
        className={`w-full flex items-center justify-start gap-2  font-medium text-sm text-gray-600 hover:font-semibold whitespace-nowrap ${
          isActive && "font-semibold"
        }`}
      >
        <span>{icon}</span>
        <span>{name}</span>
      </div>
      {items &&
        items.length > 0 &&
        (expanded ? <ChevronDownIcon /> : <ChevronRightIcon />)}
    </>
  );

  return (
    <div hidden={hidden} className="w-full">
      {items && items.length > 0 ? (
        <div className={`${style} cursor-pointer `} onClick={handleExpand}>
          {content}
        </div>
      ) : loading ? (
        <Tooltip title={"Хөгжүүлэгдэж байна"} className={style}>
          {content}
        </Tooltip>
      ) : (
        <Link href={path} onClick={handleExpand} className={style}>
          {content}
        </Link>
      )}

      {expanded &&
        items?.map((item) => (
          <SubMenuItem
            key={item.name}
            name={item.name}
            path={item.path}
            loading={item.loading}
            hidden={item.hidden}
          />
        ))}
    </div>
  );
};

export default SubMenuList;

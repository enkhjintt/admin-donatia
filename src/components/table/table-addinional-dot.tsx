import ThreeDotIcon from "../icons/three-dot-icon";
import { TableColumnTitle } from "./custom-table";
import { Dropdown, Space } from "antd/lib";
import Link from "next/link";
import CloseCircleIcon from "@/components/icons/close-circle-icon";
import EditIcon from "@/components/icons/edit-icon";
import EyeIcon from "@/components/icons/eye-icon";
import LockIcon from "@/components/icons/lock-icon";
import TrashBinIcon from "@/components/icons/trash-bin-icon";
import BlackListIcon from "../icons/black-list-icon";
import CircleActiveIcon from "../icons/circle-active-icon";

interface Props {
  isDot?: boolean;
  menuUrl?: BaseUrls[];
  showEye?: boolean;
  showEdit?: boolean;
  showLock?: boolean;
  showTrash?: boolean;
  showCircle?: boolean;
  showCircleActive?: boolean;
  showBlackList?: boolean;
  showRmBlackList?: boolean;
  showToPay?: boolean;
  showPayInCash?: boolean;
  trashHandler?: (id: number) => void;
  eyeHandler?: (id: number) => void;
  lockHandler?: (id: number) => void;
  closeHandler?: (value: any) => void;
  closeActiveHandler?: (value: any) => void;
  editHandler?: (id: number) => void;
  rmBlackListHandler?: (id: number) => void;
  blackListHandler?: (id: number) => void;
  toPayHandler?: (id: number) => void;
  payInCashHandler?: (id: number) => void;
}

interface MenuItem {
  icon: JSX.Element;
  text: string;
  dynamicPart: number;
  plug: string;
  action?: ((id: number, serial_number?: string) => void) | undefined;
}

export interface BaseUrls {
  [key: string]: string;
}

const generateMenuItem = (
  value: any,
  baseUrls: BaseUrls[],
  showEye: boolean,
  showEdit: boolean,
  showLock: boolean,
  showTrash: boolean,
  showCircle: boolean,
  showCircleActive: boolean,
  showBlackList: boolean,
  showRmBlackList: boolean,
  showToPay: boolean,
  showPayInCash: boolean,
  trashHandler?: (id: number) => void,
  eyeHandler?: (id: number) => void,
  lockHandler?: (id: number) => void,
  closeHandler?: (value: any) => void,
  closeActiveHandler?: (value: any) => void,

  editHandler?: (id: number, serial_number?: string) => void,
  rmBlackListHandler?: (id: number) => void,
  blackListHandler?: (id: number) => void,
  toPayHandler?: (id: number) => void,
  payInCashHandler?: (id: number) => void
) => {
  const menuItems: (MenuItem | false)[] = [
    showEye && {
      icon: <EyeIcon />,
      text: "Харах",
      dynamicPart: value.id || 0,
      plug: "eye",
      action: eyeHandler,
    },
    showEdit && {
      icon: <EditIcon />,
      text: "Өөрчлөлт оруулах",
      dynamicPart: value.id || 0,
      plug: "edit",
      action: editHandler,
    },
    showLock && {
      icon: <LockIcon />,
      text: "Нууц үг сэргээх",
      dynamicPart: value.id || 0,
      plug: "lock",
      action: lockHandler,
    },
    showTrash && {
      icon: <TrashBinIcon />,
      text: "Устгах",
      dynamicPart: value.id || 0,
      plug: "trash",
      action: trashHandler,
    },


    (value.status === "A" ||
      value?.status_code === "ACTIVE" ||
      value?.status_type?.code === "A") &&
      showCircle && {
        icon: <CloseCircleIcon />,
        text: "Идэвхгүй болгох",
        dynamicPart: value.id || 0,
        plug: "circle",
        action: closeHandler,
      },

    ((value?.status_code === "INACTIVE" && value?.status_code !== "ACTIVE") ||
      (value?.status_type?.code === "I" && value?.status_type?.code !== "A") ||
      (value?.status === "I" && value?.status !== "A")) &&
      showCircleActive && {
        icon: <CircleActiveIcon />,
        text: "Идэвхтэй болгох",
        dynamicPart: value.id || 0,
        plug: "circle-active",
        action: closeActiveHandler,
      },

    // (value.status === 'A' ||
    //   value?.status_code === 'ACTIVE' ||
    //   value?.status_type?.code === 'A') &&
    showBlackList && {
      icon: <BlackListIcon />,
      text: "Төлөв солих",
      // text: 'Хар жагсаалтанд оруулах',
      dynamicPart: value.id || 0,
      plug: "black-list",
      action: blackListHandler,
    },
  ].filter(Boolean);

  return menuItems
    .map((item: MenuItem | false, index: number) => {
      if (!item) {
        return false;
      }

      const baseUrlObj = baseUrls.find((base) => base[item.plug]);
      const baseUrl = baseUrlObj ? baseUrlObj[item.plug] : "";

      const label =
        typeof item.action === "function" ? (
          <div
            className="flex gap-4 pr-10 py-2 items-center min-w-36 w-full"
            onClick={() =>
              showCircleActive || showCircle || showBlackList
                ? item.action && item.action(value)
                : item.action && item.action(value.id, value.serial_number)
            }
          >
            <div className="text-base-blue">{item.icon}</div>
            <span>{item.text}</span>
          </div>
        ) : (
          <Link href={`${baseUrl}/${item.dynamicPart}`} key={index}>
            <div className="flex gap-4 pr-10 py-2 items-center min-w-36 w-full">
              <div className="text-base-blue">{item.icon}</div>
              <span>{item.text}</span>
            </div>
          </Link>
        );

      return {
        label,
        key: `${index}`,
      };
    })
    .filter(Boolean) as { label: JSX.Element; key: string }[];
};

const AddinionalDot = ({
  isDot,
  menuUrl,
  showEye: showEye = false,
  showEdit: showEdit = false,
  showLock: showLock = false,
  showTrash: showTrash = false,
  showCircle: showCircle = false,
  showCircleActive: showCircleActive = false,
  showBlackList: showBlackList = false,
  showRmBlackList: showRmBlackList = false,
  showToPay: showToPay = false,
  showPayInCash: showPayInCash = false,

  trashHandler,
  eyeHandler,
  lockHandler,
  closeHandler,
  closeActiveHandler,
  editHandler,
  rmBlackListHandler,
  blackListHandler,

  toPayHandler,
  payInCashHandler,
}: Props) => {
  const updatedColumns = isDot && {
    title: <TableColumnTitle title="" />,
    key: "Idot",
    fixed: "right",
    width: 70,
    render: (record: any, value: any, index: number) => {
      const baseUrls: BaseUrls[] = [
        { eye: "/user" },
        { edit: "/home" },
        { lock: "#" },
        { trash: "/#" },
        { circle: "/#" },
      ];
      return (
        <div key={index} className="flex items-center justify-center">
          <div className="flex item-center justify-center mt-0.5 cursor-pointer">
            <Dropdown
              menu={{
                items: generateMenuItem(
                  value,
                  menuUrl ? menuUrl : baseUrls,
                  showEye,
                  showEdit,
                  showLock,
                  showTrash,
                  showCircle,
                  showCircleActive,

                  showBlackList,
                  showRmBlackList,

                  showToPay,
                  showPayInCash,
                  trashHandler,
                  eyeHandler,
                  lockHandler,
                  closeHandler,
                  closeActiveHandler,
                  editHandler,
                  rmBlackListHandler,
                  blackListHandler,
                  toPayHandler,
                  payInCashHandler
                ),
              }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Space>
                <ThreeDotIcon />
              </Space>
            </Dropdown>
          </div>
        </div>
      );
    },
  };

  return updatedColumns;
};
export default AddinionalDot;

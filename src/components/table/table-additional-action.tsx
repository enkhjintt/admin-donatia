import TrashBinIcon from "../icons/trash-bin-icon";
import EditIcon from "../icons/edit-icon";
import LockIcon from "../icons/lock-icon";
import EyeIcon from "../icons/eye-icon";
import { Tooltip } from "antd";
import CircleActiveIcon from "../icons/circle-active-icon";

interface Props {
  isAction?: boolean;
  notTrashBin?: (id: number, serial_number: string) => void;
  eyeHandler?: (id: number) => void;
  editHandler?: (id: any) => void;
  lockHandler?: (id: any) => void;
  trashHandler?: (value: any) => void;
  plusShowHandler?: (id: number, serial_number: string) => void;
  showCorrectHandler?: (id: number, serial_number: string) => void;
  showPlus?: boolean;
  showCorrect?: boolean;
  toPayHandler?: (record: any) => void;
  payInCashHandler?: (record: any) => void;
  statusHanlder?: (record: any) => void;
  deliveryHandler?: (record: any) => void;
  showDelivery?: boolean;
  removeTrashBin?: boolean;
  removeEdit?: boolean;
  removeEye?: boolean;
  removeLock?: boolean;
  showToPay?: boolean;
  showPayInCash?: boolean;
  showActionStatus?: boolean;
}

{
  /* <>{dayjs(value?.client?.updated_at).format('YYYY-MM-DD HH:mm')}</> */
}

const AddinionalAction = ({
  isAction,
  removeEye,
  removeEdit,
  removeLock,
  removeTrashBin,
  showActionStatus,
  editHandler,
  eyeHandler,
  trashHandler,
  lockHandler,
  statusHanlder,
}: Props) => {
  const renderLastColumn = isAction && {
    title: "Үйлдэл",
    width: 100,
    align: "center",
    fixed: "right",
    render: (value: any, record: any, index: number) => {
      return (
        <div className="flex items-center justify-center">
          {removeEye ? (
            ""
          ) : (
            <Tooltip title="Дэлгэрэнгүй харах">
              <div className="flex justify-center mr-2 mt-0.5 cursor-pointer">
                <EyeIcon
                  inverse={false}
                  onClick={() =>
                    eyeHandler ? eyeHandler(record.id) : () => {}
                  }
                />
              </div>
            </Tooltip>
          )}

          {removeEdit ? (
            ""
          ) : (
            <Tooltip title="Өөрчлөлт оруулах">
              <div className="flex justify-center mr-2 mt-0.5 cursor-pointer">
                <EditIcon
                  inverse={false}
                  onClick={() =>
                    editHandler ? editHandler(record.id) : () => {}
                  }
                />
              </div>
            </Tooltip>
          )}

          {removeLock ? (
            ""
          ) : (
            <Tooltip title="Нууц үг солих">
              <div className="flex justify-center mr-2 mt-0.5 cursor-pointer">
                <LockIcon
                  inverse={false}
                  onClick={() =>
                    lockHandler ? lockHandler(record.id) : () => {}
                  }
                />
              </div>
            </Tooltip>
          )}

          {showActionStatus
            ? record.order_status_code === "PENDING" && (
                <Tooltip title="Захиалгын төлөв солих">
                  <div className="flex justify-center mr-2 mt-1 cursor-pointer items-center">
                    <CircleActiveIcon
                      inverse={false}
                      onClick={() =>
                        statusHanlder
                          ? statusHanlder(record ? record : record)
                          : () => {}
                      }
                    />
                  </div>
                </Tooltip>
              )
            : ""}

          {removeTrashBin ? (
            ""
          ) : record.is_aptms !== undefined ? (
            record.is_aptms === false && (
              <Tooltip title="Устгах">
                <div className="flex justify-center mt-0.5 cursor-pointer">
                  <TrashBinIcon
                    isRed
                    onClick={() =>
                      trashHandler ? trashHandler(record.id) : () => {}
                    }
                  />
                </div>
              </Tooltip>
            )
          ) : (
            <div className="flex justify-center mt-0.5 cursor-pointer">
              <TrashBinIcon
                isRed
                onClick={() =>
                  trashHandler ? trashHandler(record.id) : () => {}
                }
              />
            </div>
          )}
        </div>
      );
    },
  };

  return renderLastColumn;
};

export default AddinionalAction;

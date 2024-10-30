import TrashBinIcon from "../icons/trash-bin-icon";
import { TableColumnTitle } from "./custom-table";

type Props = {
  trashHandler?: (id: number, serial_number: string) => void;
  isDelete?: boolean;
};

const AddinionalDelete = ({ trashHandler, isDelete }: Props) => {
  const actionEye = isDelete && {
    title: <TableColumnTitle title="Үйлдэл " />,
    fixed: "right",
    align: "center",
    key: "Iremove",
    width: 100,

    render: (record: any, value: any, index: number) => (
      <div className="flex items-center justify-center" key={index}>
        <div className="flex justify-center mt-0.5 cursor-pointer">
          <TrashBinIcon
            isRed
            inverse
            onClick={() =>
              trashHandler
                ? trashHandler(record.id, record.serial_number)
                : () => {}
            }
          />
        </div>
      </div>
    ),
  };

  return actionEye;
};

export default AddinionalDelete;

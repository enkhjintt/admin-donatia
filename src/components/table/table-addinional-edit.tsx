import { TableColumnTitle } from "./custom-table";
import EditIcon from "../icons/edit-icon";

interface Props {
  editHandler?: (id: number) => void;
  isEdit?: boolean;
}

const AddinionalEdit = ({ editHandler, isEdit }: Props) => {
  const actionEye = isEdit && {
    title: <TableColumnTitle title="Үйлдэл " />,
    fixed: "right",
    key: "edit",
    width: 100,

    render: (record: any, _: any, index: number) => (
      <div className="flex items-center justify-center" key={index}>
        <div className="flex justify-center mt-0.5 cursor-pointer">
          <EditIcon
            inverse={false}
            onClick={() => (editHandler ? editHandler(record.id) : () => {})}
          />
        </div>
      </div>
    ),
  };

  return actionEye;
};

export default AddinionalEdit;

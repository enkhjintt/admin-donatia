import { TableColumnTitle } from "./custom-table";
import EyeIcon from "../icons/eye-icon";

interface Props {
  eyeHandler?: (id: number) => void;
  isEye?: boolean;
}

const AddinionalEye = ({ eyeHandler, isEye }: Props) => {
  const actionEye = isEye && {
    title: <TableColumnTitle title="Үйлдэл " />,
    fixed: "right",
    key: "Ieye",
    width: 100,

    render: (record: any, value: any, index: number) => (
      <div className="flex items-center justify-center" key={index}>
        <div className="flex justify-center mt-0.5 cursor-pointer">
          <EyeIcon
            inverse={false}
            onClick={() => (eyeHandler ? eyeHandler(record.id) : () => {})}
          />
        </div>
      </div>
    ),
  };

  return actionEye;
};
export default AddinionalEye;

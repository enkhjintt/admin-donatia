import { getStatusClass } from "../../utils/style-utils";

interface Props {
  isActive?: boolean;
  activeHandler?: (value: any) => void;
}

const AdditionalActive = ({ isActive, activeHandler }: Props) => {
  const updatedColumns = isActive && {
    title: "Төлөв",
    align: "center",
    render: (record: any, value: any) => (
      <div
        className="w-full cursor-pointer"
        onClick={() => (activeHandler ? activeHandler(record) : () => {})}
      >
        <div
          className={`w-full px-1 rounded-lg font-semibold leading-4 ${getStatusClass(
            value.status?.code
          )}`}
        >
          {value.status?.meaning}
        </div>
      </div>
    ),
  };

  return updatedColumns;
};

export default AdditionalActive;

import { Dropdown } from "antd";
import type { MenuProps } from "antd";

interface FilterProps {
  TopLeft?: React.ReactNode;
  TopRight?: React.ReactNode;
  BotLeft?: React.ReactNode;
  BotRight?: React.ReactNode;
}

const FilterLayout: React.FC<FilterProps> = ({
  TopLeft,
  TopRight,
  BotLeft,
  BotRight,
}) => {
  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="flex justify-between gap-2">
        <div className="flex basis-1/2 justify-start">
          <div className="grid grid-cols-4 gap-2  w-full h-full">{TopLeft}</div>
        </div>
        <div>
          <div className="flex basis-1/2 justify-end">{TopRight}</div>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex basis-1/2 justify-start ">
          <div className="grid grid-cols-2 gap-2  w-full h-full">{BotLeft}</div>
        </div>
        <div className="flex basis-1/2 justify-end ">
          <div className="grid grid-cols-3 gap-2  w-full h-full">
            {BotRight}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterLayout;

import {
  Pie,
  Cell,
  Label,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import Wrapper from "@/components/wrapper";
import DescIcon from "@/components/icons/desc-icon";

const COLORS = ["#6982fb", "#e67478", "#418958", "#f49e39", "#d34300"];

export type PieChartData = {
  alarm_name: string;
  count: number;
  percentage: number;
};

type TChart = {
  data?: PieChartData[];
  dataCount?: string;
  topHeader?: string;
  desc?: string;
};

const CustomPieChart = ({
  data,
  topHeader = "Нийт xогны сав тоо:",
  desc,
}: TChart) => {
  const effectiveDesc =
    data && data.length > 0 ? desc : "Өгөгдөл байхгүй байна";
  const uniqueNames = data?.map((item) => item.alarm_name) || [];
  const nameToColor = uniqueNames.reduce((acc, name, index) => {
    acc[name] = COLORS[index % COLORS.length];
    return acc;
  }, {} as Record<string, string>);

  return (
    <Wrapper className="p-4 h-fit">
      <div className="flex justify-between  mx-8 min-h-12 h-full w-full">
        {topHeader && (
          <h2 className="text-lg font-medium mt-4 leading-4 text-gray-800">
            {topHeader}
          </h2>
        )}
        {effectiveDesc && (
          <div className="relative group flex justify-end mr-14 mt-2">
            <DescIcon />
            <div className="w-100 absolute top-6 right-0 px-4 py-2 text-sm leading-4 bg-base-white rounded-lg shadow shadow-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <span className="text-gray-800 font-semibold">Тайлбар</span>
              <p className="text-gray-600">{effectiveDesc}</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex items-start gap-10">
        <div className="flex">
          <ResponsiveContainer width={237} height={237} className="items-start">
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                data={data}
                fill="#8884d8"
                dataKey="percentage"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={1}
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={nameToColor[entry.alarm_name]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const { alarm_name, percentage } = payload[0].payload;
                  const color = nameToColor[alarm_name] || "#000";
                  return (
                    <div className="tooltip bg-gray-200 border border-gray-300 p-2 rounded shadow-lg text-black inline-flex items-center text-sm">
                      <p className="mr-2" style={{ color }}>
                        {`${alarm_name}:`}
                      </p>
                      <p style={{ color }}>{`${percentage}`} % </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 items-start text-ls gap-4 pt-10 basics-2/3">
          {Object.entries(nameToColor).map(([name, color]) => {
            const countEntry = data?.find((entry) => entry.alarm_name === name);
            const count = countEntry ? countEntry.count : 0;

            return (
              <div
                key={name}
                className="flex items-center justify-start gap-4 mb-2"
              >
                <div
                  className="w-3 h-3 rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
                <div className="flex items-center  text-sm text-gray-600">
                  <span className="mr-1">{name}:</span>
                  <span>{count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default CustomPieChart;

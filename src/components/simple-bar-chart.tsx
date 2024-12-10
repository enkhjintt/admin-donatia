import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Rectangle,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Wrapper from "./wrapper";
import DescIcon from "./icons/desc-icon";

type ChartData = {
  name: string;
  uv?: number; // busad
  amt?: number; // unasan
};

type SimpleBarChartProps = {
  XName?: string;
  topGreen?: string;
  data?: ChartData[];
  topHeader?: string;
  desc?: string;
  chartHeight: number;
  yAxisDomainMax: number;
};

const SimpleBarChart = ({
  data = [],
  XName = "name",
  topGreen,
  topHeader,
  desc,
  chartHeight = 300,
  yAxisDomainMax = 60,
}: SimpleBarChartProps) => {
  return (
    <Wrapper>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 mx-8 min-h-12 h-full w-full ">
          {topHeader && (
            <h2 className="text-lg font-medium text-gray-800">{topHeader}</h2>
          )}
          {desc && (
            <div className="relative group flex justify-end  mr-14">
              <DescIcon />
              <div className="w-100 absolute top-full mt-2 right-0 px-4 py-2 text-sm leading-4 bg-base-white rounded-lg shadow shadow-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <span className="text-gray-800 font-semibold">Тайлбар</span>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          )}
        </div>

        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={data}
            barSize={5}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 5,
            }}
            barGap={6}
            barCategoryGap="10%"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis fontSize={12} dataKey={XName} />
            <YAxis
              fontSize={12}
              // tickFormatter={formatNumber}
              domain={[0, yAxisDomainMax]}
              ticks={[0, 20, 40, 60]}
            />
            <Tooltip />

            <Bar
              name="Тоо"
              fill="#6982fb"
              dataKey="uv"
              barSize={36}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};

export default SimpleBarChart;

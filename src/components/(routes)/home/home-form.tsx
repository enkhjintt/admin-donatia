"use client";

import { HomeProjectResponse } from "@/api/home";
import CheckCircleIcon from "@/components/icons/check-circle-icon";
import CloseCircleIcon from "@/components/icons/close-circle-icon";
import InfoCircle01Icon from "@/components/icons/info-circle-icon";
import ProjectGreenIcon from "@/components/icons/project-green-icon";
import ProjectPurpleIcon from "@/components/icons/project-purple-icon";
import ProjectRedIcon from "@/components/icons/project-red-icon";
import ProjectSuccessIcon from "@/components/icons/project-succes-icon";
import ProjectYellowIcon from "@/components/icons/project-yellow-icon";
import CustomPieChart, { PieChartData } from "@/components/pie-chart";
import SimpleBarChart from "@/components/simple-bar-chart";
import StatsDisplay from "@/components/stats-dipslay";
import {
  useHomeProject,
  useHomeProjectStatus,
  useHomeSumStatus,
} from "@/hooks/use-home-data";
import dayjs from "dayjs";
import React, { useState } from "react";


type DataPoint = {
  name: string;
  uv: number;
};

const transformData = (data: HomeProjectResponse[]): DataPoint[] => {
  return data.map((item) => ({
    name: `${item.SariinNer} сар`,
    uv: item.TusulToo,
  }));
};
type NerValues = "Бүх төсөл" | "Амжилттай" | "Амжилтгүй" | "Шинэ төсөл";
const statusIcons: Record<NerValues, React.ReactNode> = {
  "Бүх төсөл": <ProjectPurpleIcon />,
  Амжилттай: <ProjectGreenIcon />,
  Амжилтгүй: <ProjectRedIcon />,
  "Шинэ төсөл": <ProjectYellowIcon />,
};

const statusText: Record<NerValues, string> = {
  "Бүх төсөл": "Нийт төсөл",
  Амжилттай: "Амжилттай төсөл",
  Амжилтгүй: "Амжилтгүй төсөл",
  "Шинэ төсөл": "Шинэ төсөл",
};

const HomeForm: React.FC = () => {
  //
  const { data: scheduleData, isLoading: isLoadingSchedule } = useHomeProject(
    {}
  );
  const chartData = scheduleData ? transformData(scheduleData) : [];

  //pie
  const { data: statusData, isLoading: isLoadingPlanTypes } =
    useHomeProjectStatus({});

  const pieStatusData: PieChartData[] = statusData
    ? statusData.map((item) => ({
        alarm_name: item.ner,
        count: item.tusul_tuluv_too,
        percentage: item.tusul_tuluv_huvi,
      }))
    : [];

  //Stats
  const { data: statsData, isLoading: isLoadingStats } = useHomeSumStatus({});

  const filteredStatusData = statsData?.filter((item) =>
    ["Бүх төсөл", "Амжилттай", "Амжилтгүй", "Шинэ төсөл"].includes(item.ner)
  );

  return (
    <div id="chart-container" className="space-y-4">
      <div className="w-full grid grid-cols-4 gap-4">
        {filteredStatusData?.map((status) => (
          <StatsDisplay
            key={status.ner}
            className="py-4"
            icon={statusIcons[status.ner as NerValues]}
            text={statusText[status.ner as NerValues]}
            valueCount={status.tusul_tuluv_too}
          />
        ))}
      </div>

      <div>
        <SimpleBarChart
          data={chartData}
          XName="name"
          topHeader="Нийт бүртгүүлсэн төслийн тоо"
          topGreen="Тоо"
          chartHeight={400}
          yAxisDomainMax={60}
          desc="Админ вебд бүртгүүлсэн нийт төслийн тоог сар тус бүрээр харуулна"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <CustomPieChart
          topHeader="Төслийн төлөв"
          data={pieStatusData}
          desc="Админ вебд бүртгүүлсэн нийт төслийн төлвийн тоог харуулна"
        />
      </div>
    </div>
  );
};

export default HomeForm;

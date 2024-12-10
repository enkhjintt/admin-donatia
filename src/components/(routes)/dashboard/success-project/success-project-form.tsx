"use client";

import ClassPurpleIcon from "@/components/icons/class-purple-icon";
import ClassRedIcon from "@/components/icons/class-red-icon";
import ClassYellowIcon from "@/components/icons/class-yellow-icon";
import CustomPieChart, { PieChartData } from "@/components/pie-chart";
import StatsDisplay from "@/components/stats-dipslay";
import { useSuccessClass, useSuccessType } from "@/hooks/use-dashboard-data";
import { useHomeProjectStatus } from "@/hooks/use-home-data";

import React, { useState } from "react";

type NerValues = "Урамшуулалт" | "Хандив";
const statusIcons: Record<NerValues, React.ReactNode> = {
  Урамшуулалт: <ClassPurpleIcon />,
  Хандив: <ClassRedIcon />,
};

const statusText: Record<NerValues, string> = {
  Урамшуулалт: "Урамшуулалт төсөл",
  Хандив: "Хандивын төсөл",
};

const SuccessProjectForm: React.FC = () => {
  //pie
  const { data: statusData, isLoading: isLoadingPlanTypes } = useSuccessType(
    {}
  );

  const pieStatusData: PieChartData[] = statusData
    ? statusData.map((item) => ({
        alarm_name: item.AngilalNer,
        count: item.AngilalToo,
        percentage: item.AngilalHuvi,
      }))
    : [];

  //Stats
  const { data: statsData, isLoading: isLoadingStats } = useSuccessClass({});
  const filteredStatusData = statsData?.filter((item) =>
    ["Урамшуулалт", "Хандив"].includes(item.TurulNer)
  );
  const pieClassData: PieChartData[] = statsData
    ? statsData.map((item) => ({
        alarm_name: item.TurulNer,
        count: item.TurulToo,
        percentage: item.TurulHuvi,
      }))
    : [];

  return (
    <div id="chart-container" className="space-y-4">
      <div className="w-full grid grid-cols-4 gap-4">
        {/* <div className="col"></div> */}
      <StatsDisplay
            className="py-4 col-span-2"
            icon={<ClassYellowIcon/>}
            text={"Тайлбар: Амжилттай төслийн статистик мэдээллийг (Бүтэн жилээр) харуулж байна."}
          />
        {filteredStatusData?.map((status) => (
          <StatsDisplay
            key={status.TurulNer}
            className="py-4"
            icon={statusIcons[status.TurulNer as NerValues]}
            text={statusText[status.TurulNer as NerValues]}
            valueCount={status.TurulToo}
          />
        ))}
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <CustomPieChart
          topHeader="Амжилттай төслийн ангилал"
          data={pieStatusData}
          desc="Donatia-д бүртгүүлсэн амжилттай төслийн ангиллыг харуулна"
        />
        <CustomPieChart
          topHeader="Амжилттай төслийн төрөл"
          data={pieClassData}
          desc="Donatia-д бүртгүүлсэн амжилттай төслийн төлвийг харуулна"
        />
      </div>
    </div>
  );
};

export default SuccessProjectForm;

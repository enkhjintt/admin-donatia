"use client";

import ClassPurpleIcon from "@/components/icons/class-purple-icon";
import ClassRedIcon from "@/components/icons/class-red-icon";
\
import ClassYellowIcon from "@/components/icons/class-yellow-icon";
import CustomPieChart, { PieChartData } from "@/components/pie-chart";
import StatsDisplay from "@/components/stats-dipslay";
import { useNewClass, useNewType } from "@/hooks/use-dashboard-data";

import React, { useState } from "react";


const NewProjectForm: React.FC = () => {
  //pie
  const { data: statusData, isLoading: isLoadingPlanTypes } = useNewType({});
=======

const NewProjectForm: React.FC = () => {
  //pie
  const { data: statusData, isLoading: isLoadingPlanTypes } = useNewType(
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
  const { data: statsData, isLoading: isLoadingStats } = useNewClass({});
  const pieClassData: PieChartData[] = statsData
    ? statsData.map((item) => ({
        alarm_name: item.TurulNer,
        count: item.TurulToo,
        percentage: item.TurulHuvi,
      }))
    : [];

  return (
    <div id="chart-container" className="space-y-4">

      <StatsDisplay
        className="py-4 col-span-2"
        icon={<ClassYellowIcon inverse={true}/>}
        text={
          "Тайлбар: Төслийн шаардлага ханган, `Donatia` сайтад нийтлэгдсэн, хугацаа нь дуусаагүй төслийн статистик мэдээллийг (3 сараар) харуулж байна."
        }
      />

      <div className="w-full grid grid-cols-2 gap-4">
        <CustomPieChart
          topHeader="Шинэ төслийн ангилал"
          data={pieStatusData}
          desc="Donatia-д бүртгүүлсэн шинэ төслийн ангиллыг харуулна"
        />
        <CustomPieChart
          topHeader="Шинэ төслийн төрөл"
          data={pieClassData}
          desc="Donatia-д бүртгүүлсэн шинэ төслийн төлвийг харуулна"
        />
      </div>
    </div>
  );
};

export default NewProjectForm;

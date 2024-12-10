import React from "react";
import Wrapper from "@/components/wrapper";

export default function StatsDisplay({
  icon,
  valueCount,
  percentage,
  width = "100%",
  text,
  label,
  className,
}: {
  icon: React.ReactNode;
  valueCount: number;
  percentage?: number;
  color?: string;
  width?: string;
  imgSize?: number;
  text: string;
  label?: string;
  className?: string;
}) {
  return (
    <Wrapper className={`flex flex-1  w-full  px-4 items-center ${className}`}>
      <div className="flex items-start w-full">
        <div className="flex-shrink-0">{icon}</div>
        <div className="mx-4 flex flex-col justify-center flex-grow">
          <h6 className="text-gray-600 text-base mb-2 leading-4 2xl:leading-6">
            {text}
          </h6>
          <p className="font-bold text-2xl  text-gray-800 leading-4 2xl:leading-6">{`${valueCount} ${
            label || ""
          }`}</p>
        </div>
      </div>
    </Wrapper>
  );
}

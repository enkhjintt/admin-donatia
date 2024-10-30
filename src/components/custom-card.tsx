import React from "react";
import { Avatar, Card as AntCard } from "antd";
import type { CardProps } from "antd/es/card";

// Define the allowed size variants
type SizeVariant = "small" | "medium" | "large";

type IProps = {
  title: string;
  description: string;
  avatarSrc?: string;
  imageSrc: string;
  className?: string;
  size?: SizeVariant; // size prop defined as SizeVariant
  progress?: number;
};

// Define size styles for different sizes, including imageHeight
const sizeStyles: Record<
  SizeVariant,
  {
    width: number;
    height: number;
    avatarSize: number;
    titleSize: string;
    descriptionSize: string;
    imageHeight: number;
  }
> = {
  small: {
    width: 500,
    height: 614,
    avatarSize: 40,
    titleSize: "text-lg",
    descriptionSize: "text-lg",
    imageHeight: 380,
  },
  medium: {
    width: 380,
    height: 300,
    avatarSize: 32,
    titleSize: "text-sm leading-tight",
    descriptionSize: "text-xs",
    imageHeight: 150,
  },
  large: {
    width: 400,
    height: 500,
    avatarSize: 40,
    titleSize: "text-lg",
    descriptionSize: "text-lg",
    imageHeight: 180,
  },
};

const CustomCard: React.FC<IProps & CardProps> = ({
  title,
  description,
  avatarSrc = "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
  imageSrc,
  size = "medium", // Default size set to medium
  className = "",
  progress = 0,
  ...rest
}) => {
  // Destructure size properties
  const { width, height, avatarSize, titleSize, descriptionSize, imageHeight } =
    sizeStyles[size as SizeVariant];

  const validProgress = progress > 100 ? 100 : progress < 0 ? 0 : progress;
  const progressColor = "bg-primary-normal";

  return (
    <AntCard
      className={`bg-base-white shadow-xl ${className}`}
      style={{ width, height, display: "flex", flexDirection: "column" }}
      cover={
        <img
          alt="example"
          src={imageSrc}
          style={{ objectFit: "cover", height: `${imageHeight}px` }}
        />
      }
      {...rest}
    >
      <div style={{ flexGrow: 1 }}>
        <div className="flex items-center">
          <Avatar src={avatarSrc} size={avatarSize} />
          <div className="ml-4">
            <div className={`${titleSize} font-semibold text-gray-600`}>
              {title}
            </div>
            <div className={`${descriptionSize} text-gray-600`}>
              {description}
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <span>{`${validProgress} %`}</span>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`${progressColor} h-full rounded-full transition-all duration-300 ease-in-out`}
              style={{ width: `${validProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </AntCard>
  );
};

export default CustomCard;

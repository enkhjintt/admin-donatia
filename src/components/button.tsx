import React from "react";
import { Button as AntdButton, type ButtonProps } from "antd";

import LoadingIcon from "./icons/loading-icon";
import { FocusClassName } from "@/utils/style-utils";

const VARIANT = {
  none: "bg-base-transparent text-primary-normal border border-primary-normal",
  primary:
    "bg-primary-normal border border-primary-normal shadow-xs  enabled:active:bg-primary-darker disabled:bg-gray-400 disabled:border-gray-400",
  secondary: " bg-base-white border text-gray-300 font-normal border-gray-300 ",
  gradient:
    "bg-gradient-to-r to-secondary-normal from-pink-normal border-none shadow-xs enabled:hover:bg-secondary-lighter enabled:active:bg-secondary-light disabled:bg-secondary-dark disabled:border-secondary-dark",
  white: "bg-base-white text-primary-normal border border-base-white ",
  link: "",
  rectangle:
    "w-40 h-full bg-gray-100 border-none text-primary-normal shadow-xs enabled:hover:bg-gradient-to-r to-secondary-normal from-pink-normal enabled:hover:text-base-white enabled:active:bg-secondary-light ",
  text: "bg-base-white  text-primary-normal border-2 border-primary-normal shadow-xs ",
  icon: "bg-none border border-base-white w-fit h-fit shadow-none text-primary-normal",
} as const;

type Variant = keyof typeof VARIANT;

const TEXT_VARIANT = {
  none: "",
  primary: "font-bold text-base-white text-sm leading-6",
  secondary: "text-gray-500",
  "secondary-red": "font-bold text-error-normal text-sm leading-6",
  white: "font-bold text-gray-800",
  gradient: "font-normal text-base-white text-sm leading-6",
  link: "",
  rectangle: "font-medium",
  text: "",
  icon: "",
};

const PADDING = {
  none: "p-0",
  primary: "px-3 py-1.5",
  white: "",
  secondary: "p-0",
  link: "p-2",
  double: "px-10 py-1.5",
  circle: "p-1.5",
} as const;

type PaddingVariant = keyof typeof PADDING;

type IProps = Omit<ButtonProps, "type" | "size" | "children"> & {
  variant?: Variant;
  textVariant?: Variant;
  padding?: PaddingVariant;
  placeholder?: string;
  rounded?: boolean;
  suffix?: React.ReactNode;
  fit?: boolean;
  disabled?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, IProps>(
  (
    {
      variant = "primary",
      textVariant = "primary",
      padding = "primary",
      rounded = true,
      loading = false,
      icon,
      fit = true,
      className,
      suffix,
      placeholder,
      disabled,
      ...restProps
    },
    ref
  ) => {
    return (
      <AntdButton
        disabled={disabled}
        ref={ref}
        icon={loading ? <LoadingIcon /> : icon}
        type={variant === "link" ? "link" : undefined}
        className={`${rounded && "rounded-md"} ${
          TEXT_VARIANT[textVariant || variant]
        } ${VARIANT[variant]} ${PADDING[padding]} ${className} ${
          fit && "h-fit"
        } flex ${
          variant === "rectangle" ? "flex-col" : "flex-row"
        } justify-center items-center gap-2 ${FocusClassName}`}
        {...restProps}
      >
        {variant === "rectangle" && (
          <span
            className={
              `${
                suffix ? "hover:fill-base-white" : ""
              }` /* Apply hover effect to suffix */
            }
          >
            {suffix}
          </span>
        )}
        {placeholder && <span>{placeholder}</span>}

        {variant !== "rectangle" && suffix}
      </AntdButton>
    );
  }
);

Button.displayName = "Button";

export default Button;

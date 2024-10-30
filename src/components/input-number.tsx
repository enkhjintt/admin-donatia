import {
  InputNumber as AntdInputNumber,
  Form,
  type InputNumberProps,
} from "antd";

import AlertCircleIcon from "./icons/alert-circle-icon";
import LoadingIcon from "./icons/loading-icon";

const VARIANT = {
  none: "",
  primary: "",
} as const;

type Variant = keyof typeof VARIANT;
const defualtPlaceholder = "Талбар бөглөнө үү";

type IProps = Omit<InputNumberProps, "size"> & {
  variant?: Variant;
  loading?: boolean;
  rounded?: boolean;
  isLabeled?: boolean;
  size?: "sm" | "md" | "lg" | "fit";
};

const InputNumber: React.FC<IProps> = ({
  variant = "primary",
  placeholder = defualtPlaceholder,
  isLabeled = false,
  prefix,
  loading = false,
  disabled,
  rounded = true,
  size = "fit",
  className,
  ...restProps
}) => {
  const { status, errors } = Form.Item.useStatus();

  const heightClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    fit: "h-fit",
  };

  const heightClass = heightClasses[size] || "h-fit";

  return (
    <>
      <AntdInputNumber
        disabled={disabled}
        prefix={loading ? <LoadingIcon /> : prefix}
        placeholder={placeholder || undefined}
        className={`${className} ${
          isLabeled && "relative -top-5"
        }  py-1 px-3 w-full ${heightClass} -mb-5 border ${
          variant !== "none"
            ? status === "error"
              ? "border border-misc-100"
              : "border border-gray-300"
            : ""
        } ${!isLabeled && "-top-1"} ${
          disabled && "bg-base-white border-none text-gray-700 -ml-2"
        }`}
        suffix={
          <span className={status === "error" ? "inline" : "hidden"}>
            <AlertCircleIcon />
          </span>
        }
        {...restProps}
      />

      {errors.length !== 0 && (
        <ul
          id={restProps["aria-describedby"]}
          role="alert"
          className={`flex flex-wrap max-w-full w-full ${
            isLabeled ? "relative" : ""
          } break-all`}
        >
          {errors.map((error, index) => (
            <li key={`error-${placeholder}-${index}`} className="mr-2">
              <div className="text-sm text-error-normal tracking-wide">
                {error}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default InputNumber;

import { Input as AntdInput, Form } from "antd";
import { useState, useEffect } from "react";

const VARIANT = {
  none: "border-2 border-primary-normal",
  primary: "",
} as const;

type Variant = keyof typeof VARIANT;
const defaultPlaceholder = "Талбар бөглөнө үү";

type TextAreaProps = React.ComponentProps<typeof AntdInput.TextArea>;

type IProps = Omit<TextAreaProps, "size"> & {
  variant?: Variant;
  loading?: boolean;
  rounded?: boolean;
  isLabeled?: boolean;
  size?: "sm" | "md" | "lg" | "fit";
  maxLength?: number;
  showCounter?: boolean;
};

const TextArea: React.FC<IProps> = ({
  variant = "primary",
  placeholder = defaultPlaceholder,
  isLabeled = false,
  loading = false,
  disabled,
  rounded = true,
  size = "fit",
  maxLength,
  showCounter = true,
  className,
  value,
  onChange,
  ...restProps
}) => {
  const { status, errors } = Form.Item.useStatus();
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (value) {
      setCharCount((value as string).length);
    } else {
      setCharCount(0);
    }
  }, [value]);

  const heightClasses = {
    sm: "h-60",
    md: "h-60",
    lg: "h-60",
    fit: "h-60",
  };

  const heightClass = heightClasses[size] || "h-fit";

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    if (onChange) onChange(e); // Preserve original onChange
  };

  return (
    <>
      <AntdInput.TextArea
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength} // Built-in maxLength support
        onChange={handleInputChange}
        className={`${className} ${
          isLabeled && "relative -top-5"
        } py-2 px-3 w-full ${heightClass} ${
          variant !== "none"
            ? status === "error"
              ? "border-2 border-primary-normal"
              : "border-2 border-gray-100"
            : "border-none"
        } ${!isLabeled && "-top-1"} ${disabled && "bg-gray-100"}`}
        {...restProps}
      />

      {showCounter && maxLength && (
        <div className="text-right text-sm text-gray-500 mt-1">
          {charCount}/{maxLength}
        </div>
      )}

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
              <div className="text-sm text-primary-normal tracking-wide">
                {error}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TextArea;

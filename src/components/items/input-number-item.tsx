import InputNumber from "../input-number";
import FormItem, { type IFormItemProps } from "./form-item";

import { inputConverterToNumber } from "@/utils/data-converter";

type TProps = Omit<IFormItemProps, "label,size"> & {
  label?: string;
  name?: string;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxLength?: number;
  size?: "sm" | "md" | "lg" | "fit";
  inputClassName?: string;
  prefix?: React.ReactNode;
  errorMessage?: string;
};

const InputNumberItem: React.FC<TProps> = ({
  name = "number",
  errorMessage,
  label = "Дугаар",
  placeholder = `${label} оруулна уу`,
  disabled,
  readonly,
  allowClear = false,
  required,
  maxLength = 8,
  size = "fit",
  inputClassName,
  prefix,
  rules: rulesProps = [],
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [];

  if (required) {
    rules.push({
      required: true,
      message: errorMessage ? errorMessage : `${label} заавал оруулна уу`,
    });
  }

  return (
    <FormItem
      name={name}
      label={label}
      required={required}
      rules={rules}
      {...restProps}
    >
      <InputNumber
        prefix={prefix}
        readOnly={readonly}
        onKeyDown={inputConverterToNumber}
        maxLength={maxLength}
        className={`w-full ${inputClassName}`}
        disabled={disabled}
        placeholder={placeholder}
      />
    </FormItem>
  );
};

export default InputNumberItem;

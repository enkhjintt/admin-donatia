import { DatePickerProps } from "antd";
import { Dayjs } from "dayjs";

import DatePicker from "../date-picker";
import FormItem, { type IFormItemProps } from "./form-item";

type IProps = Omit<IFormItemProps, "label"> & {
  label?: string;
  name?: string | any;
  isLabeled?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (date: string | string[]) => void;
  maxDate?: Dayjs;
  className?: string;
  picker?: "month" | "week" | "year";
  format?: string;
  value?: Dayjs;
};

const DateItemStart: React.FC<IProps> = ({
  name = "begin_date",
  picker,
  label,
  maxDate,
  isLabeled = false,
  placeholder = "Эхлэх огноо",
  disabled,
  readonly,
  value,
  onChange,
  allowClear = true,
  required,
  rules: rulesProps = [],
  className,
  format,
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  if (required) {
    rules.push({
      required: true,
      message: `Эхлэх огноо заавал оруулна уу`,
    });
  }

  const handleStartDateChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    onChange && onChange(dateString);
  };

  return (
    <FormItem
      name={name}
      label={label}
      required={required}
      rules={rules}
      className={className}
      {...restProps}
    >
      <DatePicker
        value={value}
        className={className}
        maxDate={maxDate}
        picker={picker}
        allowClear={allowClear}
        isLabeled={isLabeled}
        placeholder={placeholder}
        onChange={handleStartDateChange}
      />
    </FormItem>
  );
};

export default DateItemStart;

import { DatePickerProps } from "antd";
import { Dayjs } from "dayjs";
import FormItem, { type IFormItemProps } from "./form-item";
import DatePicker from "../date-picker";

type IProps = Omit<IFormItemProps, "label"> & {
  label?: string;
  name?: string | any;
  isLabeled?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (date: string | string[]) => void;
  minDate?: Dayjs;
  className?: string;
  picker?: "month" | "week" | "year";
  format?: string;
  value?: Dayjs;
};

const DateItemEnd: React.FC<IProps> = ({
  name = "end_date",
  isLabeled = false,
  label,
  minDate,
  placeholder = "Дуусах огноо",
  disabled,
  readonly,
  value,
  onChange,
  allowClear = true,
  required,
  rules: rulesProps = [],
  className,
  picker,
  format,
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  if (required) {
    rules.push({
      required: true,
      message: `Дуусах огноо заавал оруулна уу`,
    });
  }

  const handleEndDateChange: DatePickerProps["onChange"] = (
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
        minDate={minDate}
        allowClear={allowClear}
        isLabeled={isLabeled}
        placeholder={placeholder}
        onChange={handleEndDateChange}
      />
    </FormItem>
  );
};

export default DateItemEnd;

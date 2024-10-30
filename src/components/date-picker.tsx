import { DatePicker as AntdDatePicker, Form, type DatePickerProps } from "antd";
import CalendarIcon from "./icons/calendar-icon";
import { Dayjs } from "dayjs";

type PickerMode = "date" | "week" | "month" | "quarter" | "year";

type IProps = DatePickerProps & {
  isLabeled?: boolean;
  picker?: PickerMode;
  value?: Dayjs;
};

const DatePicker: React.FC<IProps> = ({
  className,
  picker,
  value,
  suffixIcon,
  placeholder,
  disabled,
  isLabeled = false,
  ...restProps
}) => {
  const { status, errors } = Form.Item.useStatus();

  return (
    <>
      <AntdDatePicker
        value={value}
        picker={picker}
        disabled={disabled}
        format={"YYYY/MM/DD"}
        suffixIcon={
          !disabled ? (
            suffixIcon !== undefined ? (
              suffixIcon
            ) : (
              <CalendarIcon />
            )
          ) : null
        }
        className={`${className} ${
          isLabeled ? "-top-1 bg-base-white" : "mb-0"
        } px-3 py-2 font-normal text-base leading-6 border-gray-300 ${
          disabled ? "bg-base-white border-none text-gray-700 -ml-" : ""
        } `}
        placeholder={placeholder}
        {...restProps}
      />

      {errors.length !== 0 && (
        <ul
          id={restProps["aria-describedby"]}
          role="alert"
          className={`flex flex-wrap mt-2 mb-2 ${isLabeled ? "-top-1" : ""}`}
        >
          {errors.map((error, index) => (
            <li key={`error-${placeholder}-${index}`} className="mr-2">
              <div className="text-sm text-error-normal">{error}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DatePicker;

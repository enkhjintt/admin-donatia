import React, { useEffect, useState } from "react";
import { Dropdown, Form, Menu } from "antd";
import ChevronRightIcon from "@/components/icons/chevron-right-icon";
import CalendarIcon from "@/components/icons/calendar-icon";
import DateItemStart from "./date-item-start";
import DateItemEnd from "./date-item-end";
import dayjs, { Dayjs } from "dayjs";
import { IFormItemProps } from "./form-item";

type IProps = Omit<IFormItemProps, "label"> & {
  required?: boolean;
  disabled?: boolean;
  beginDateLabel?: string;
  endDateLabel?: string;
  isEndDateAllowClear?: boolean;
  isStartDateAllowClear?: boolean;
  isLabeled?: boolean;
  onBeginDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  className?: string;
  handleClear?: boolean;
  resetLabel?: boolean;
  initialMaxDate?: Dayjs;
  initialMinDate?: Dayjs;
  initialBeginDate?: Dayjs | null;
  initialEndDate?: Dayjs | null;
  format?: string;
  picker?: "month" | "week" | "year";
};

const DateBetweenCaseItem: React.FC<IProps> = ({
  picker,
  format = "YYYY-MM-DD",
  required,
  disabled,
  beginDateLabel,
  resetLabel,
  endDateLabel,
  isLabeled,
  onBeginDateChange,
  onEndDateChange,
  className,
  handleClear,
  isEndDateAllowClear,
  isStartDateAllowClear,
  initialMaxDate,
  initialMinDate,
  initialBeginDate,
  initialEndDate,
}) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [maxDate, setMaxDate] = useState<Dayjs | undefined>(
    initialMaxDate ? dayjs(initialMaxDate) : undefined
  );
  const [minDate, setMinDate] = useState<Dayjs | undefined>(
    initialMinDate ? dayjs(initialMinDate) : undefined
  );
  const [activeLabel, setActiveLabel] = useState<string | undefined>(
    "Өдөр сонгох"
  );
  useEffect(() => {
    if (resetLabel) {
      setActiveLabel("Өдөр сонгох");
    }
  }, [resetLabel]);

  const handleMenuClick = (key: string, label: string) => {
    let startDateValue: Dayjs;
    let endDateValue: Dayjs = dayjs();

    form.setFieldValue("end_date", dayjs());

    switch (key) {
      case "1day":
        // Set begin_date to the start of yesterday and end_date to today
        startDateValue = dayjs().subtract(1, "day").startOf("day");
        endDateValue = dayjs();
        break;
      case "1week":
        form.setFieldValue("begin_date", dayjs().startOf("week").add(1, "day"));
        startDateValue = dayjs().startOf("week").add(1, "day");
        break;
      case "1month":
        form.setFieldValue("begin_date", dayjs().startOf("month"));
        startDateValue = dayjs().startOf("month");
        break;
      case "3months":
        startDateValue = dayjs().subtract(2, "month").startOf("month");
        break;
      case "6months":
        startDateValue = dayjs().subtract(5, "month").startOf("month");
        break;
      case "1year":
        form.setFieldValue("begin_date", dayjs().startOf("year"));
        startDateValue = dayjs().startOf("year");
        break;
      default:
        return;
    }

    setMaxDate(endDateValue);
    setMinDate(startDateValue);
    setActiveLabel(label);
    setIsOpen(true);
    onBeginDateChange?.(startDateValue.format(format));
    onEndDateChange?.(endDateValue.format(format));
  };

  const handleStartDateChange = (date: string | string[]) => {
    const formattedDate = dayjs(date as string);
    setMinDate(formattedDate);
    onBeginDateChange && onBeginDateChange(formattedDate.format(format));
  };

  const handleEndDateChange = (date: string | string[]) => {
    const formattedDate = dayjs(date as string);
    setMaxDate(formattedDate);
    onEndDateChange && onEndDateChange(formattedDate.format(format));
  };

  const menu = (
    <div className="flex flex-col gap-2 bg-base-white border border-gray-200 rounded-xl">
      <Form form={form} className="mt-1 flex gap-2">
        <div className="w-full">
          <DateItemStart
            value={dayjs()}
            format={format}
            picker={picker}
            required={required}
            disabled={disabled}
            allowClear={isStartDateAllowClear}
            maxDate={!handleClear ? maxDate : undefined}
            isLabeled={isLabeled}
            label={beginDateLabel}
            onChange={handleStartDateChange}
            className={className}
            initialValue={initialBeginDate}
          />
        </div>

        <div className="w-full">
          <DateItemEnd
            value={dayjs()}
            picker={picker}
            required={required}
            disabled={disabled}
            allowClear={isEndDateAllowClear}
            minDate={!handleClear ? minDate : undefined}
            isLabeled={isLabeled}
            label={endDateLabel}
            onChange={handleEndDateChange}
            className={className}
            initialValue={initialEndDate}
          />
        </div>
      </Form>

      <Menu className="flex flex-col items-center py-2">
        <Menu.Item
          key="1day"
          onClick={() => handleMenuClick("1day", "Өнөөдөр")}
          className="w-full"
        >
          <div
            className={`flex items-center justify-center py-2 text-sm font-medium ${
              activeLabel === "Өнөөдөр"
                ? "text-white bg-gray-300"
                : "text-gray-700 bg-white"
            } border border-gray-300 rounded-md w-full`}
          >
            Өнөөдөр
          </div>
        </Menu.Item>
        <Menu.Item
          key="1week"
          onClick={() => handleMenuClick("1week", "Энэ 7 хоног")}
          className="w-full"
        >
          <div
            className={`flex items-center justify-center py-2 text-sm font-medium ${
              activeLabel === "Энэ 7 хоног"
                ? "text-white bg-gray-300"
                : "text-gray-700 bg-white"
            } border border-gray-300 rounded-md w-full`}
          >
            Энэ 7 хоног
          </div>
        </Menu.Item>
        <Menu.Item
          key="1month"
          onClick={() => handleMenuClick("1month", "Энэ сар")}
          className="w-full"
        >
          <div
            className={`flex items-center justify-center py-2 text-sm font-medium ${
              activeLabel === "Энэ сар"
                ? "text-white bg-gray-300"
                : "text-gray-700 bg-white"
            } border border-gray-300 rounded-md w-full`}
          >
            Энэ сар
          </div>
        </Menu.Item>
        <Menu.Item
          key="3months"
          onClick={() => handleMenuClick("3months", "3н сар")}
          className="w-full"
        >
          <div
            className={`flex items-center justify-center py-2 text-sm font-medium ${
              activeLabel === "3н сар"
                ? "text-white bg-gray-300"
                : "text-gray-700 bg-white"
            } border border-gray-300 rounded-md w-full`}
          >
            3н сар
          </div>
        </Menu.Item>
        <Menu.Item
          key="6months"
          onClick={() => handleMenuClick("6months", "6н сар")}
          className="w-full"
        >
          <div
            className={`flex items-center justify-center py-2 text-sm font-medium ${
              activeLabel === "6н сар"
                ? "text-white bg-gray-300"
                : "text-gray-700 bg-white"
            } border border-gray-300 rounded-md w-full`}
          >
            6н сар
          </div>
        </Menu.Item>
        <Menu.Item
          key="1year"
          onClick={() => handleMenuClick("1year", "Бүтэн жил")}
          className="w-full"
        >
          <div
            className={`flex items-center justify-center py-2  text-sm font-medium ${
              activeLabel === "Бүтэн жил"
                ? "text-white bg-gray-300"
                : "text-gray-700 bg-white"
            } border border-gray-300 rounded-md w-full`}
          >
            Бүтэн жил
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      onOpenChange={(flag) => setIsOpen(flag)}
      open={isOpen}
      className=" rounded-md "
    >
      <div
        className={`flex items-center justify-between px-4 py-2 bg-base-white cursor-pointer border border-gray-300 ${className} h-10`}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon color="fill-gray-500" />
          <span className="text-sm font-medium text-gray-700 leading-4">
            {activeLabel || "Өдөр сонгох"}
          </span>
        </div>

        <ChevronRightIcon color="fill-gray-500" />
      </div>
    </Dropdown>
  );
};

export default DateBetweenCaseItem;

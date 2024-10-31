import FilterLayout from "@/components/filter-layout";
import Button from "@/components/button";
import TrashIcon from "@/components/icons/trash-icon";
import DateBetweenCaseItem from "@/components/items/date-between-case-item";
import SearchItem from "@/components/items/search-item";

import SelectStatusItem from "@/components/items/status-select-item";

import ValueCounter from "@/components/value-counter";
import { isDateValid } from "@/utils/dateisValid";
import { Form } from "antd";
import { useState } from "react";

type IProps = {
  resLength: number;
  onChangeSearch: (serial_number: string) => void;
  onTypeSearch: (device_type: string) => void;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
  onStatusChange: (status: string) => void;
};

const ProjectTabActions: React.FC<IProps> = ({
  resLength = 0,
  onChangeSearch,
  onTypeSearch,
  onStartDateChange,
  onEndDateChange,
  onStatusChange,
}) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [loading, setLoading] = useState(false);
  const [cleared, setCleared] = useState<boolean>(false);

  const handleClear = () => {
    setCleared(true);
    form.resetFields();
    onChangeSearch("");
    onStartDateChange("");
    onStatusChange("");
    onEndDateChange("");
    onTypeSearch("");
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onValuesChange={(
          _,
          values: {
            serial_number: string;
            status: string;
            device_type: string;
          }
        ) => {
          onChangeSearch(values.serial_number);
          onStatusChange(values.status);
          onTypeSearch(values.device_type);
        }}
      >
        <FilterLayout
          BotLeft={
            <>
              <SearchItem
                label=""
                placeholder="Төслийн нэрээр хайх"
                name="serial_number"
                className="col-span-3"
              />

              <SearchItem
                label=""
                allowClear={true}
                placeholder="Төслийн төрлөөр хайх"
                name={"device_type"}
              />
            </>
          }
          BotRight={
            <>
              <SelectStatusItem
                name={"status"}
                className="w-full mt-1"
                allowClear={cleared}
                placeholder="Төлөвөөр хайх"
                label=""
              />
              <DateBetweenCaseItem
                format="YYYY-MM-DD"
                isLabeled
                isEndDateAllowClear
                isStartDateAllowClear
                handleClear={cleared}
                onBeginDateChange={(date) => {
                  setCleared(false);
                  onStartDateChange(isDateValid(date));
                }}
                onEndDateChange={(date) => {
                  setCleared(false);
                  onEndDateChange(isDateValid(date));
                }}
              />
              <Button
                icon={<TrashIcon color="fill-error-normal" />}
                variant="secondary"
                placeholder="Цэвэрлэх"
                loading={loading}
                onClick={handleClear}
              />
            </>
          }
        />
        {values?.serial_number && values?.serial_number.length > 0 && (
          <ValueCounter length={resLength} />
        )}
      </Form>
    </>
  );
};

export default ProjectTabActions;

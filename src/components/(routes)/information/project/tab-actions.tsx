import FilterLayout from "@/components/filter-layout";
import Button from "@/components/button";
import TrashIcon from "@/components/icons/trash-icon";
import DateBetweenCaseItem from "@/components/items/date-between-case-item";
import SearchItem from "@/components/items/search-item";
import ValueCounter from "@/components/value-counter";
import { isDateValid } from "@/utils/dateisValid";
import { Form } from "antd";
import { useState } from "react";
import SelectProjectTypeItem from "@/components/items/project-type-select-item";
import SelectProjectStatusItem from "@/components/items/project-status-select-item";

type IProps = {
  resLength: number;
  onChangeSearch: (garchig: string) => void;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
};

const ProjectTabActions: React.FC<IProps> = ({
  resLength = 0,
  onChangeSearch,
  onStartDateChange,
  onEndDateChange,
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
    onEndDateChange("");
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
            garchig: string;
          }
        ) => {
          onChangeSearch(values.garchig);
        }}
      >
        <FilterLayout
          BotLeft={
            <>
              <SearchItem
                label=""
                placeholder="Төслийн гарчигаар хайх"
                name="garchig"
              />
              <SelectProjectTypeItem
                label=""
                placeholder="Төрлөөр хайх"
                className="mt-1"
                name={"tusul_turul_ner"}
              />
            </>
          }
          BotRight={
            <>
            <SelectProjectStatusItem
                label=""
                placeholder="Төлвөөр хайх"
                className="mt-1"
                name="tusul_tuluv_ner"
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
                icon={<TrashIcon />}
                variant="icon"
                placeholder="Цэвэрлэх"
                loading={loading}
                onClick={handleClear}
              />
            </>
          }
        />
        {values?.garchig && values?.garchig.length > 0 && (
          <ValueCounter length={resLength} />
        )}
      </Form>
    </>
  );
};

export default ProjectTabActions;

import FilterLayout from "@/components/filter-layout";
import Button from "@/components/button";
import TrashIcon from "@/components/icons/trash-icon";
import DateBetweenCaseItem from "@/components/items/date-between-case-item";
import SearchItem from "@/components/items/search-item";
import ValueCounter from "@/components/value-counter";
import { isDateValid } from "@/utils/dateisValid";
import { Form } from "antd";
import { useState } from "react";

type IProps = {
  resLength: number;
  onChangeSearch: (tulbur_helber_ner: string) => void;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
};

const PaymentTypeTabActions: React.FC<IProps> = ({
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
            tulbur_helber_ner: string;
          }
        ) => {
          onChangeSearch(values.tulbur_helber_ner);
        }}
      >
        <FilterLayout
          BotLeft={
            <>
              <SearchItem
                label=""
                placeholder="Төлбөрийн хэлбэр нэрээр хайх"
                name="tulbur_helber_ner"
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
            </>
          }
          BotRight={
            <>
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
        {values?.tulbur_helber_ner && values?.tulbur_helber_ner.length > 0 && (
          <ValueCounter length={resLength} />
        )}
      </Form>
    </>
  );
};

export default PaymentTypeTabActions;

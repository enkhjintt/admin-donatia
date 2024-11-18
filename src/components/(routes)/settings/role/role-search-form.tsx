import Button from "@/components/button";
import FilterLayout from "@/components/filter-layout";

import TrashIcon from "@/components/icons/trash-icon";
import DateBetweenCaseItem from "@/components/items/date-between-case-item";
import SearchItem from "@/components/items/search-item";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IProps = {
  roleLength: number;
  onChangeSearch: (name: string) => void;
  onStartDateChange: (start_date: string) => void;
  onEndDateChange: (end_date: string) => void;
};

const RoleSearchForm: React.FC<IProps> = ({
  roleLength = 0,
  onChangeSearch,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [loading, setLoading] = useState(false);
  const [cleared, setCleared] = useState<boolean>(false);
  const router = useRouter();

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
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        onValuesChange={(
          _,
          values: {
            name: string;
            begin_date: string;
            end_date: string;
          }
        ) => {
          onChangeSearch(values.name);
          onStartDateChange(values.begin_date);
          onEndDateChange(values.end_date);
        }}
      >
        <FilterLayout
          BotLeft={
            <>
              <SearchItem placeholder="Эрхийн нэрээр хайх" name="name" />
              <DateBetweenCaseItem
                format="YYYY-MM-DD"
                isLabeled
                isEndDateAllowClear
                resetLabel={cleared}
                isStartDateAllowClear
                handleClear={cleared}
                onBeginDateChange={(date) => {
                  setCleared(false);
                  onStartDateChange(date);
                }}
                onEndDateChange={(date) => {
                  setCleared(false);
                  onEndDateChange(date);
                }}
              />
            </>
          }
          BotRight={
            <Button
              icon={<TrashIcon />}
              variant="text"
              placeholder="Цэвэрлэх"
              loading={loading}
              onClick={handleClear}
            />
          }
        />
      </Form>
    </>
  );
};

export default RoleSearchForm;

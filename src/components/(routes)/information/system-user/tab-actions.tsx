import React from "react";
import Button from "@/components/button";

import PlusIcon from "@/components/icons/plus-icon";
import TrashIcon from "@/components/icons/trash-icon";
import DateBetweenCaseItem from "@/components/items/date-between-case-item";
import SearchItem from "@/components/items/search-item";
import { Form } from "antd";

import { useState } from "react";
import FilterLayout from "@/components/filter-layout";

type IProps = {
  resLength: number;
  onChangeSearch: (first_name: string) => void;
  onRoleSearch: (roles: string) => void;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
  onOrgSearch: (organization_name: string) => void;
};

const SystemUserTabActions: React.FC<IProps> = ({
  resLength = 0,
  onChangeSearch,
  onStartDateChange,
  onEndDateChange,
  onOrgSearch,
  onRoleSearch,
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
    onOrgSearch("");
    onRoleSearch("");
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
            organization_name: string;
            first_name: string;
            roles: string;
          }
        ) => {
          onChangeSearch(values.first_name);
          onOrgSearch(values.organization_name);
        }}
      >
        <FilterLayout
          BotLeft={
            <>
              <SearchItem
                name={" organization_name"}
                placeholder="Байгууллагаар хайх"
                label=""
                className="w-full"
              />
              <SearchItem
                label=""
                placeholder="Нэрээр хайх"
                name="first_name"
                className="w-full"
              />
            </>
          }
          BotRight={
            <>
              <DateBetweenCaseItem
                format="YYYY-MM-DD"
                isLabeled
                isEndDateAllowClear
                isStartDateAllowClear
                handleClear={cleared}
                resetLabel={cleared}
                onBeginDateChange={(date) => {
                  setCleared(false);
                  onStartDateChange(date);
                }}
                onEndDateChange={(date) => {
                  setCleared(false);
                  onEndDateChange(date);
                }}
              />

              <Button
                variant="primary"
                icon={<TrashIcon />}
                placeholder="Цэвэрлэх"
                loading={loading}
                onClick={handleClear}
              />
            </>
          }
        />
      </Form>
    </>
  );
};

export default SystemUserTabActions;

import React from "react";
import { Checkbox, Col, Row } from "antd";
import Title from "./title";

interface CheckboxGroupProps {
  label: string;
  options: { label: string; value: string }[];
  onChange: (checkedValues: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  onChange,
}) => (
  <div className="w-full">
    <Title level={2} title={label} />
    <Checkbox.Group
      className="w-full max-w-xs"
      onChange={(checkedValues) => onChange(checkedValues as string[])}
    >
      <Row>
        {options.map((option) => (
          <Col span={24} key={option.value} className="mb-2">
            <Checkbox value={option.value} className="text-gray-600 text-sm">
              {option.label}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  </div>
);

export default CheckboxGroup;

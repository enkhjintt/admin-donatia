import React, { CSSProperties } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";

interface CustomCollapseProps {
  items: CollapseProps["items"];
  defaultActiveKey?: string[];
  bordered?: boolean;
}

const CustomCollapse: React.FC<CustomCollapseProps> = ({
  items,
  defaultActiveKey = ["1"],
  bordered = false,
}) => {
  const { token } = theme.useToken();

  const customBorderColor = "#f5f6f8";
  const customBgColor = "#f5f6f8";

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: `${customBgColor}`,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${customBorderColor}`,
    padding: "12px",
  };

  return (
    <Collapse
      className=""
      bordered={false}
      defaultActiveKey={defaultActiveKey}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{ background: token.colorBgContainer }}
      items={
        items?.map((item) => ({
          ...item,
          label: (
            <div className="font-semibold text-sm text-gray-800">
              {item.label}
            </div>
          ),
          children: (
            <div className="ml-6 text-gray-600 text-xs font-medium">
              {item.children}
            </div>
          ),
          style: panelStyle,
        })) || []
      }
    />
  );
};

export default CustomCollapse;

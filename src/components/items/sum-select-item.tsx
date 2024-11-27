import { CityResponse } from "@/api/address";
import Select from "../select";

import FormItem, { type IFormItemProps } from "./form-item";
import { useDistrict } from "@/hooks/use-district";

type IProps = Omit<IFormItemProps, "label"> & {
  disabled?: boolean;
  allowClear?: boolean;
  label?: string;
  isFull?: boolean;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (value: number) => void;
  aimagId?: string;
};

const DistrictItem: React.FC<IProps> = ({
  aimagId,
  name = "sum_code",
  isFull = true,
  allowClear,
  disabled,
  label = `Сум/дүүрэг `,
  readonly,
  placeholder = "Сум/дүүрэг сонгоно уу",
  required,
  onChange,
  rules: rulesProps = [],
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  const { data: district, isLoading } = useDistrict(aimagId && aimagId);

  console.log({ district });

  if (required) {
    rules.push({
      required: true,
      message: `Сум/дүүрэг заавал сонгоно уу`,
    });
  }

  return (
    <FormItem
      name={name}
      label={label}
      required={required}
      rules={rules}
      className={isFull ? "w-full" : "w-44"}
      {...restProps}
    >
      <Select
        loading={isLoading}
        allowClear={allowClear}
        popupClassName={`${readonly && "hidden"}`}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        options={district?.map((statusOption: CityResponse) => ({
          label: statusOption.name,
          value: statusOption.code,
        }))}
      />
    </FormItem>
  );
};

export default DistrictItem;

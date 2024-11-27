import { CityResponse } from "@/api/address";
import Select from "../select";
import FormItem, { type IFormItemProps } from "./form-item";
import { useKhoroo } from "@/hooks/use-khoroo";

type IProps = Omit<IFormItemProps, "label"> & {
  disabled?: boolean;
  allowClear?: boolean;
  label?: string;
  isFull?: boolean;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (value: number) => void;
  aimag?: string;
  sum?: string;
};

const SelectKhorooItem: React.FC<IProps> = ({
  aimag,
  sum,
  name = "khoroo",
  isFull = true,
  allowClear,
  disabled,
  label = `Баг / Хороо`,
  readonly,
  placeholder = "Баг / Хороо сонгоно уу",
  required,
  onChange,
  rules: rulesProps = [],
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  const { data: bags, isLoading } = useKhoroo(aimag, sum);

  if (required) {
    rules.push({
      required: true,
      message: `Баг / Хороо заавал оруулна уу`,
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
        options={bags?.map((statusOption: CityResponse) => ({
          label: statusOption.name,
          value: statusOption.code,
        }))}
      />
    </FormItem>
  );
};

export default SelectKhorooItem;

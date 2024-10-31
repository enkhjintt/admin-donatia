import Select from "../select";
import FormItem, { type IFormItemProps } from "./form-item";
import { useLookup } from "@/hooks/use-lookup";

type IProps = Omit<IFormItemProps, "label"> & {
  disabled?: boolean;
  isFull?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  readonly?: boolean;
  label?: string;
  onChange?: (value: string) => void;
};

const SelectStatusItem: React.FC<IProps> = ({
  name = "status",
  isFull = true,
  allowClear,
  disabled,
  label = `Төлөв`,
  placeholder = "Төлөв сонгоно уу",
  required,
  readonly,
  onChange,
  rules: rulesProps = [],
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  const { data: statusasOptions, isLoading } = useLookup("STATUS-A");

  if (required) {
    rules.push({
      required: true,
      message: `Төлөв заавал сонгоно уу`,
    });
  }

  return (
    <FormItem
      name={name}
      label={label}
      required={required}
      rules={rules}
      className={`${isFull ? "w-full" : "w-44"} `}
      {...restProps}
    >
      <Select
        className="-top-1"
        allowClear={allowClear}
        loading={isLoading}
        popupClassName={`${readonly && "hidden"}`}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        options={statusasOptions?.map((statusa) => ({
          value: statusa.code,
          label: statusa.description,
        }))}
      />
    </FormItem>
  );
};

export default SelectStatusItem;

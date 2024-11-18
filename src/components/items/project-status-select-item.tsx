import { useProjectStatus } from "@/hooks/use-project-status";
import Select from "../select";
import FormItem, { type IFormItemProps } from "./form-item";

type IProps = Omit<IFormItemProps, "label"> & {
  disabled?: boolean;
  isFull?: boolean;
  label?: string;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (value: number) => void;
  className?: string;
  allowClear?: boolean;
};

const SelectProjectStatusItem: React.FC<IProps> = ({
  name = "tuluv_id",
  label = "Төслийн төлөв",
  disabled,
  className = "w-full",
  placeholder = "Төслийн төлөв сонгоно уу",
  readonly,
  isFull = true,
  allowClear,
  required,
  onChange,
  rules: rulesProps = [],
  ...restProps
}) => {
  const { data: types, isLoading } = useProjectStatus();
  const typeItems = types?.items || [];

  const rules: IFormItemProps["rules"] = [...rulesProps];

  if (required) {
    rules.push({
      required: true,
      message: `Төслийн төлөв заавал сонгоно уу`,
    });
  }

  return (
    <FormItem
      name={name}
      label={label}
      required={required}
      rules={rules}
      {...restProps}
    >
      <Select
        loading={isLoading}
        allowClear={allowClear}
        popupClassName={`${readonly && "hidden"}`}
        isLabeled={isFull}
        disabled={disabled}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        options={typeItems.map((type) => ({
          value: type.id,
          label: type.ner,
        }))}
      />
    </FormItem>
  );
};

export default SelectProjectStatusItem;

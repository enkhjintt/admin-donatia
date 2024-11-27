
import { useProjectClass } from "@/hooks/use-project-class";
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

const SelectProjectClassItem: React.FC<IProps> = ({
  name = "tusul_angilal_id",
  label = "Төслийн ангилал",
  disabled,
  className = "w-full",
  placeholder = "Төслийн ангилал сонгоно уу",
  readonly,
  isFull = true,
  allowClear,
  required,
  onChange,
  rules: rulesProps = [],
  ...restProps
}) => {
  const { data: types, isLoading } = useProjectClass();
  const typeItems = types?.items || [];

  const rules: IFormItemProps["rules"] = [...rulesProps];

  if (required) {
    rules.push({
      required: true,
      message: `Төслийн ангилал заавал сонгоно уу`,
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

export default SelectProjectClassItem;

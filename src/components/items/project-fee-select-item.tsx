import { useProjectFee } from "@/hooks/use-project-fee";
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

const SelectProjectFeeItem: React.FC<IProps> = ({
  name = "uilchilgeeni_huraamj_id",
  label = "Төсөл байршуулах хугацаа",
  disabled,
  className = "w-full",
  placeholder = "Төсөл байршуулах хугацаа сонгоно уу",
  readonly,
  isFull = true,
  allowClear,
  required,
  onChange,
  rules: rulesProps = [],
  ...restProps
}) => {
  const { data: types, isLoading } = useProjectFee();
  const typeItems = types?.items || [];

  const rules: IFormItemProps["rules"] = [...rulesProps];

  if (required) {
    rules.push({
      required: true,
      message: `Төсөл байршуулах хугацаа заавал сонгоно уу`,
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
          label: `${type.honog} хоног`,
        }))}
      />
    </FormItem>
  );
};

export default SelectProjectFeeItem;

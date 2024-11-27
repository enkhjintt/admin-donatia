import FormItem, { type IFormItemProps } from "./form-item";
import Input from "../input";

type IProps = Omit<IFormItemProps, "label"> & {
  label?: string;
  name?: string | (string | number)[];
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  allowClear?: boolean;
  size?: "sm" | "md" | "lg" | "fit";
  isLabeled?: boolean; // Add isLabeled prop here
};

const InputItem: React.FC<IProps> = ({
  name = "name",
  label = "Нэр",
  placeholder = `${label} оруулна уу`,
  required,
  disabled,
  onChange,
  className,
  readonly,
  allowClear,
  size = "fit",
  isLabeled = false, // Default value for isLabeled
  rules: rulesProps = [],
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  if (required) {
    rules.push({
      required: true,
      message: `${label} заавал оруулна уу`,
    });
  }

  return (
    <FormItem
      name={name}
      label={label}
      required={required}
      rules={rules}
      className={className}
      {...restProps}
    >
      <Input
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        allowClear={allowClear}
        readOnly={readonly}
        disabled={disabled}
        placeholder={placeholder}
        size={size}
        isLabeled={isLabeled} // Pass isLabeled to Input component
      />
    </FormItem>
  );
};

export default InputItem;

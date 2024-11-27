import TextArea from "../input-text-area"; // Assuming TextArea component is imported correctly
import FormItem, { type IFormItemProps } from "./form-item";

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
  isLabeled?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  value?: string;
};

const TextAreaItem: React.FC<IProps> = ({
  name = "name",
  label = "Тайлбар",
  placeholder = `${label} оруулна уу`,
  required,
  disabled,
  onChange,
  className,
  readonly,
  maxLength,
  showCounter,
  allowClear,
  size = "fit",
  isLabeled = false,
  value,
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
      <TextArea
        value={value} // Make sure value is passed to the TextArea component
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        allowClear={allowClear}
        readOnly={readonly}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        size={size}
        isLabeled={isLabeled}
        showCounter={showCounter}
      />
    </FormItem>
  );
};

export default TextAreaItem;

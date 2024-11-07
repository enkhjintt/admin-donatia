import FormItem, { type IFormItemProps } from "./form-item";
import Input from "../input";

type IProps = Omit<IFormItemProps, "label"> & {
  label?: string;
  userName?: boolean;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  allowClear?: boolean;
};

const NameItem: React.FC<IProps> = ({
  name = "name",
  label = "Хэрэглэгчийн нэр",
  placeholder = `${label} оруулна уу`,
  required,
  userName = false,
  disabled,
  onChange,
  className,
  readonly,
  allowClear,
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

  if (userName) {
    rules.push({
      pattern: /^(?!.*[a-zA-Z]).*[а-яА-ЯёЁүҮөӨ]+.*$/,
      message: "Зөвхөн крилл үсэг оруулна уу",
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
      />
    </FormItem>
  );
};

export default NameItem;

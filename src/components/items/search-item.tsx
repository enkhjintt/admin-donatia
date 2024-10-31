import SearchIcon from "../icons/search-icon";
import Input from "../input";
import FormItem, { type IFormItemProps } from "./form-item";

type IProps = Omit<IFormItemProps, "label"> & {
  loading?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  allowClear?: boolean;
  prefix?: boolean;
  label?: string;
  isLabeled?: boolean;
};

const SearchItem: React.FC<IProps> = ({
  name = "search",
  label,
  placeholder,
  onChange,
  loading = false,
  allowClear = true,
  required,
  rules: rulesProps = [],
  className,
  prefix = true,
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  if (required) {
    rules.push({
      required: true,
      message: `${label || "Search"} is required`,
    });
  }

  return (
    <FormItem
      name={name}
      required={required}
      label={label}
      rules={rules}
      {...restProps}
      className={`w-full h-10 mt-1`}
    >
      <Input
        allowClear={allowClear}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        loading={loading}
        prefix={prefix && <SearchIcon />}
        placeholder={placeholder}
        className={` ${className}`}
      />
    </FormItem>
  );
};

export default SearchItem;

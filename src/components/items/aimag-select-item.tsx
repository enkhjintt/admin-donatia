import { useCity } from "@/hooks/use-city";
import Select from "../select";
import FormItem, { type IFormItemProps } from "./form-item";
import { CityResponse } from "@/api/address";

type IProps = Omit<IFormItemProps, "label"> & {
  disabled?: boolean;
  allowClear?: boolean;
  label?: string;
  isFull?: boolean;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const AimagCityItem: React.FC<IProps> = ({
  name = "aimag_code",
  isFull = true,
  allowClear,
  disabled,
  label = `Аймаг/Хот`,
  readonly,
  placeholder = "Аймаг/Хотоо сонгоно уу",
  required,
  onChange,
  rules: rulesProps = [],
  ...restProps
}) => {
  const rules: IFormItemProps["rules"] = [...rulesProps];

  const { data: city, isLoading } = useCity();

  if (required) {
    rules.push({
      required: true,
      message: `Аймаг/Хотоо заавал сонгоно уу`,
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
        options={city?.map((statusOption: CityResponse) => ({
          label: statusOption.name,
          value: statusOption.code,
        }))}
      />
    </FormItem>
  );
};

export default AimagCityItem;

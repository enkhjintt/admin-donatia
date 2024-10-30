import { Form, type FormItemProps } from "antd";

export type IFormItemProps = Omit<FormItemProps, "label"> & {
  label?: string | false;
};

const FormItem: React.FC<IFormItemProps> = ({ label, ...restProps }) => {
  return (
    <>
      <Form.Item
        className="mb-2"
        colon={false}
        label={
          label ? (
            <span className="relative  left-0 z-10 bg-base-white font-light text-sm leading-6 text-gray-600">
              {label}
            </span>
          ) : undefined
        }
        help={false}
        {...restProps}
      />
    </>
  );
};

export default FormItem;

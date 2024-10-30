import { Input as AntdInput, Form } from 'antd';
import { ChangeEvent, ChangeEventHandler } from 'react';
import LoadingIcon from './icons/loading-icon';
import { TextAreaProps } from 'antd/lib/input';

const VARIANT = {
  none: '',
  primary: '',
} as const;

type Variant = keyof typeof VARIANT;
const defualtPlaceholder = 'Талбар бөглөнө үү';

type IProps = Omit<TextAreaProps, 'size'> & {
  variant?: Variant;
  loading?: boolean;
  rounded?: boolean;
  isLabeled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'fit';
};

const TextArea: React.FC<IProps> = ({
  variant = 'primary',
  placeholder = defualtPlaceholder,
  isLabeled = true,
  prefix,
  loading = false,
  disabled,
  rounded = true,
  size = 'fit',
  className,
  onChange,
  ...restProps
}) => {
  const { status, errors } = Form.Item.useStatus();

  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    fit: 'h-fit',
  };

  const heightClass = heightClasses[size] || 'h-fit';

  return (
    <>
      <AntdInput.TextArea
        disabled={disabled}
        placeholder={placeholder ? placeholder : undefined}
        classNames={{
          prefix: 'mr-2',
          suffix: 'ml-2',
        }}
        className={`${className} ${
          isLabeled && 'absolute -top-5'
        }  py-3 px-3.5 w-full ${heightClass} border ${
          variant !== 'none'
            ? status === 'error'
              ? 'border border-error-normal'
              : 'border border-gray-300'
            : ''
        } ${!isLabeled && 'mt-3'} ${disabled && 'bg-gray-100'}`}
        rootClassName={``}
        onChange={onChange as ChangeEventHandler<HTMLTextAreaElement>}
        {...restProps}
      />

      {errors.length !== 0 && (
        <ul
          id={restProps['aria-describedby']}
          role="alert"
          className={`flex flex-wrap mt-2 mb-2 ${
            isLabeled ? 'absolute mt-5' : ''
          }`}
        >
          {errors.map((error, index) => (
            <li key={`error-${placeholder}-${index}`} className="mr-2 ">
              <div className="text-sm text-error-normal">{error}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TextArea;

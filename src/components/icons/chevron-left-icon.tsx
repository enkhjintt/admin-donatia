type IProps = {
  size?: "medium";
  color?: string;
  className?: string;
  inverse?: boolean;
  inverseColor?: string;
};

export default function ChevronLeftIcon({
  size = "medium",
  color = "fill-current",
  className,
  inverse,
  inverseColor = "fill-gray-300",
}: IProps) {
  let style = "w-4 h-4";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <svg
      className={`${style} fill-current`}
      viewBox="0 0 12 19"
     
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.2426 9.50096L11.6673 16.3068L9.546 18.2513L0 9.50096L9.546 0.750488L11.6673 2.69503L4.2426 9.50096Z"
        className={inverse ? inverseColor : color}
      />
    </svg>
  );
}

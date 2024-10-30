type IProps = {
  size?: "medium";
  color?: string;
  className?: string;
  inverse?: boolean;
  inverseColor?: string;
};

export default function ChevronRightIcon({
  size = "medium",
  color = "fill-gray-600",
  className,
  inverse,
  inverseColor = "fill-gray-300",
}: IProps) {
  let style = "w-6 h-4";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <svg
      className={`${style}`}
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6666 12.6667C14.5109 12.667 14.3599 12.6127 14.24 12.5133C14.1036 12.4003 14.0179 12.2377 14.0016 12.0613C13.9853 11.885 14.0399 11.7094 14.1533 11.5733L17.14 8L14.26 4.42C14.1481 4.28227 14.0958 4.10564 14.1145 3.92922C14.1333 3.75279 14.2216 3.59112 14.36 3.48C14.4994 3.35731 14.6837 3.29835 14.8685 3.31734C15.0532 3.33632 15.2217 3.43152 15.3333 3.58L18.5533 7.58C18.7555 7.826 18.7555 8.18067 18.5533 8.42667L15.22 12.4267C15.0843 12.5903 14.8788 12.6794 14.6666 12.6667Z"
        className={inverse ? inverseColor : color}
      />
    </svg>
  );
}

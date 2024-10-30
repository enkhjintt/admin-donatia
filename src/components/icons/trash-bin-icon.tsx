type IProps = {
  size?: "medium" | "lg";
  color?: string;
  inverse?: boolean;
  inverseColor?: string;
  onClick?: () => void;
  isRed?: boolean;
};

export default function TrashBinIcon({
  onClick,
  size = "medium",
  isRed = false,
  color = "fill-error-normal",
  inverse = true,
  inverseColor = `${isRed ? "fill-error-normal" : "fill-blue-700"} `,
}: IProps) {
  let style = "w-5 h-6";

  switch (size) {
    case "medium":
      break;
    case "lg":
      style = "w-8 h-9";
  }

  return (
    <svg
      onClick={onClick}
      width="17"
      height="19"
      viewBox="0 0 17 19"
      xmlns="http://www.w3.org/2000/svg"
      className={`${style} fill-error-normal`}
    >
      <path
        d="M10.7166 3.49996H13.6332V4.66663H12.4666V12.25C12.4666 12.5721 12.2054 12.8333 11.8832 12.8333H3.71655C3.39439 12.8333 3.13322 12.5721 3.13322 12.25V4.66663H1.96655V3.49996H4.88322V1.74996C4.88322 1.4278 5.14439 1.16663 5.46655 1.16663H10.1332C10.4554 1.16663 10.7166 1.4278 10.7166 1.74996V3.49996ZM11.2999 4.66663H4.29989V11.6666H11.2999V4.66663ZM6.04989 6.41663H7.21655V9.91663H6.04989V6.41663ZM8.38322 6.41663H9.54989V9.91663H8.38322V6.41663ZM6.04989 2.33329V3.49996H9.54989V2.33329H6.04989Z"
        className={inverse ? inverseColor : color}
      />
    </svg>
  );
}

type IProps = {
  size?: "medium";
  color?: string;
};

export default function TrashIcon({
  size = "medium",
  color = "fill-primary-normal",
}: IProps) {
  let style = "w-6 h-6";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <svg
      className={`${style} fill-none`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 2V0H15V2H20V4H18V19C18 19.5523 17.5523 20 17 20H3C2.44772 20 2 19.5523 2 19V4H0V2H5ZM4 4V18H16V4H4ZM7 7H9V15H7V7ZM11 7H13V15H11V7Z"
        className={color}
      />
    </svg>
  );
}

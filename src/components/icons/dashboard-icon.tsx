type IProps = {
  size?: "medium";
  color?: string;
};

export default function DashboardIcon({
  size = "medium",
  color = "fill-base-white",
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
        d="M13 21V11H21V21H13ZM3 13V3H11V13H3ZM9 11V5H5V11H9ZM3 21V15H11V21H3ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 3H21V9H13V3ZM15 5V7H19V5H15Z"
        className={color}
      />
    </svg>
  );
}
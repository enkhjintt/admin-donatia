type IProps = {
  size?: "medium";
  color?: string;
};

export default function MenuIcon({
  size = "medium",
  color = "fill-gray-600",
}: IProps) {
  let style = "w-[24px] h-[24px]";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <svg
      className={`${style} fill-base-white`}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5H21V6.5H3V4.5ZM9 11.5H21V13.5H9V11.5ZM3 18.5H21V20.5H3V18.5Z"
        className={color}
      />
    </svg>
  );
}

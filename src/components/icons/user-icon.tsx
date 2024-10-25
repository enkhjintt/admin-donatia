type IProps = {
  size?: "small" | "medium" | "large";
  color?: string;
};

export default function UserIcon({
  size = "medium",
  color = "fill-current",
}: IProps) {
  let style = "";

  switch (size) {
    case "small":
      style = "w-4 h-4";
      break;
    case "medium":
      style = "w-6 h-6";
      break;
    case "large":
      style = "w-8 h-8";
      break;
    default:
      style = "w-6 h-6";
  }
  return (
    <svg
      className={`${style} fill-none`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 21H14V19C14 17.3431 12.6569 16 11 16H5C3.34315 16 2 17.3431 2 19V21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12ZM8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
        className={color}
      />
    </svg>
  );
}

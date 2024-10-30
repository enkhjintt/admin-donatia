type IProps = {
  size?: "medium";
  color?: string;
  inverse?: boolean;
  onClick?: () => void;
};

export default function EyeIcon({
  size = "medium",
  color = "fill-current",
  inverse = true,
  onClick,
}: IProps) {
  let style = "w-5 h-6";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <div onClick={onClick}>
      <svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        className={`${style} fill-none`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_650_3232)">
          <path
            d="M7.7999 1.75C10.9453 1.75 13.5621 4.01319 14.1107 7C13.5621 9.98678 10.9453 12.25 7.7999 12.25C4.65446 12.25 2.03764 9.98678 1.48901 7C2.03764 4.01319 4.65446 1.75 7.7999 1.75ZM7.7999 11.0833C10.2707 11.0833 12.3849 9.36367 12.92 7C12.3849 4.63635 10.2707 2.91667 7.7999 2.91667C5.32907 2.91667 3.21485 4.63635 2.67968 7C3.21485 9.36367 5.32907 11.0833 7.7999 11.0833ZM7.7999 9.625C6.35013 9.625 5.17488 8.44976 5.17488 7C5.17488 5.55025 6.35013 4.375 7.7999 4.375C9.2496 4.375 10.4249 5.55025 10.4249 7C10.4249 8.44976 9.2496 9.625 7.7999 9.625ZM7.7999 8.45833C8.60531 8.45833 9.25823 7.80541 9.25823 7C9.25823 6.19459 8.60531 5.54167 7.7999 5.54167C6.99449 5.54167 6.34154 6.19459 6.34154 7C6.34154 7.80541 6.99449 8.45833 7.7999 8.45833Z"
            className={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_650_3232">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="translate(0.799805)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

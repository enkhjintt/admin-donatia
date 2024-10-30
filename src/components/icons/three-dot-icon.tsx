type IProps = {
  size?: "medium";
  color?: string;
  onClick?: () => void;
};

export default function ThreeDotIcon({
  size = "medium",
  color = "fill-current",
  onClick,
}: IProps) {
  let style = "w-6 h-6";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <div onClick={onClick}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        // fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${style} fill-none`}
      >
        {/* <g opacity="0.48"> */}
        <path
          d="M18 19.6667C18.9205 19.6667 19.6667 18.9205 19.6667 18C19.6667 17.0795 18.9205 16.3333 18 16.3333C17.0796 16.3333 16.3334 17.0795 16.3334 18C16.3334 18.9205 17.0796 19.6667 18 19.6667Z"
          // fill="#637381"
          className={color}
        />
        <path
          d="M18 13.8333C18.9205 13.8333 19.6667 13.0871 19.6667 12.1667C19.6667 11.2462 18.9205 10.5 18 10.5C17.0796 10.5 16.3334 11.2462 16.3334 12.1667C16.3334 13.0871 17.0796 13.8333 18 13.8333Z"
          className={color}
        />
        <path
          d="M18 25.5C18.9205 25.5 19.6667 24.7538 19.6667 23.8333C19.6667 22.9129 18.9205 22.1667 18 22.1667C17.0796 22.1667 16.3334 22.9129 16.3334 23.8333C16.3334 24.7538 17.0796 25.5 18 25.5Z"
          className={color}
        />
        {/* </g> */}
      </svg>
    </div>
  );
}

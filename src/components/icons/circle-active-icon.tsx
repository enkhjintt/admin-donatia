type IProps = {
  size?: "medium";
  color?: string;
  inverse?: boolean;
  onClick?: () => void;
};

export default function CircleActiveIcon({
  size = "medium",
  inverse = true,
  color = "fill-current",
  onClick,
}: IProps) {
  let style = "w-3 h-5";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <div onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className={`${style} fill-none`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 10C0 4.47715 4.47715 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.73 13.61L14.3 7.61V7.58C14.5179 7.29419 14.5668 6.91382 14.4283 6.58218C14.2897 6.25054 13.9848 6.01801 13.6283 5.97218C13.2718 5.92635 12.9179 6.07419 12.7 6.36L8.92 11.36L7.29 9.28C7.07028 8.99776 6.71668 8.85418 6.36239 8.90334C6.00811 8.9525 5.70696 9.18694 5.57239 9.51834C5.43783 9.84974 5.49028 10.2278 5.71 10.51L8.15 13.62C8.34082 13.8615 8.63222 14.0017 8.94 14C9.2495 13.9993 9.54121 13.8552 9.73 13.61Z"
          className={inverse ? color : "fill-primary-normal"}
        />
      </svg>
    </div>
  );
}

type IProps = {
  size?: "medium";
  color?: string;
  inverse?: boolean;
  onClick?: () => void;
};

export default function EditIcon({
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
        fill="none"
        className={`${style} fill-none`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_650_3234)">
          <path
            d="M13.0498 3.94175L11.8831 5.10842V2.33329H6.63314V5.24996H3.71647V11.6666H11.8831V10.0581L13.0498 8.89148V12.2547C13.0498 12.5743 12.7903 12.8333 12.4703 12.8333H3.12929C2.80925 12.8333 2.5498 12.5709 2.5498 12.246V4.66663L6.05167 1.16663H12.4652C12.7881 1.16663 13.0498 1.43222 13.0498 1.74518V3.94175ZM13.5038 5.13773L14.3287 5.96268L9.79142 10.5L8.96525 10.4987L8.96647 9.67501L13.5038 5.13773Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_650_3234">
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

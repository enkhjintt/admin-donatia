type IProps = {
  size?: "medium";
  color?: string;
  className?: string;
  inverse?: boolean;
  inverseColor?: string;
};

export default function DotIcon({
  size = "medium",
  color = "fill-base-white",
  inverse,
  inverseColor = "fill-gray-500",
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
      <circle
        cx="2"
        cy="2"
        r="3"
        transform="matrix(1 0 0 -1 10 14)"
        className={inverse ? inverseColor : color}
      />
    </svg>
  );
}

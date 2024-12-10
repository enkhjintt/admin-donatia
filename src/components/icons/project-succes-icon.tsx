type ProjectSuccessIconProps = {
  size?: "small" | "medium" | "larger" | "extra-large"; // Added "extra-large"
  color?: string;
  inverse?: boolean;
  inverseColor?: string;
  className?: string;
};

const ProjectSuccessIcon: React.FC<ProjectSuccessIconProps> = ({
  size = "medium",
  color = "#FFFFFF",
  inverse = false,
  inverseColor = "#0070F0",
  className = "",
}) => {
  const sizes = {
    small: "24",
    medium: "60",
    larger: "64",
    "extra-large": "80",
  };

  const svgSize = sizes[size] || sizes.medium;

  return (
    <svg
      className={`${className} fill-none`}
      width={svgSize}
      height={svgSize}
      viewBox="0 0 94 94"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="94"
        height="94"
        rx="15"
        fill={inverse ? inverseColor : "#6A82FB"}
      />

<path d="M69.1666 45.8333V35.3333C69.1666 34.7145 68.9208 34.121 68.4832 33.6834C68.0456 33.2458 67.4521 33 66.8333 33H46.9999L41.1666 26H27.1666C26.5477 26 25.9543 26.2458 25.5167 26.6834C25.0791 27.121 24.8333 27.7145 24.8333 28.3333V65.6667C24.8333 66.2855 25.0791 66.879 25.5167 67.3166C25.9543 67.7542 26.5477 68 27.1666 68H44.6666" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M53.7667 52.8333H63.5667L66.8333 56.9516L58.6667 66.8333L50.5 56.9516L53.7667 52.8333Z" fill="#6A82FB" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>

    </svg>
  );
};

export default ProjectSuccessIcon;

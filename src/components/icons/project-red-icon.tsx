type ProjectRedIconProps = {
  size?: "small" | "medium" | "larger" | "extra-large"; // Added "extra-large"
  color?: string;
  inverse?: boolean;
  inverseColor?: string;
  className?: string;
};

const ProjectRedIcon: React.FC<ProjectRedIconProps> = ({
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
        fill={inverse ? inverseColor : "#E67478"}
      />




<path d="M69.1668 45.8333V35.3333C69.1668 34.7145 68.921 34.121 68.4834 33.6834C68.0458 33.2458 67.4523 33 66.8335 33H47.0002L41.1668 26H27.1668C26.548 26 25.9545 26.2458 25.5169 26.6834C25.0793 27.121 24.8335 27.7145 24.8335 28.3333V65.6667C24.8335 66.2855 25.0793 66.879 25.5169 67.3166C25.9545 67.7542 26.548 68 27.1668 68H44.6668M54.0002 54L65.6668 65.6667M65.6668 54L54.0002 65.6667" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>


    </svg>
  );
};

export default ProjectRedIcon;

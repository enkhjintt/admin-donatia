type ProjectYellowIconProps = {
  size?: "small" | "medium" | "larger" | "extra-large"; // Added "extra-large"
  color?: string;
  inverse?: boolean;
  inverseColor?: string;
  className?: string;
};

const ProjectYellowIcon: React.FC<ProjectYellowIconProps> = ({
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
        fill={inverse ? inverseColor : "#F49E39"}
      />


<path d="M69.1668 43.8333V33.3333C69.1668 32.7145 68.921 32.121 68.4834 31.6834C68.0458 31.2458 67.4523 31 66.8335 31H47.0002L41.1668 24H27.1668C26.548 24 25.9545 24.2458 25.5169 24.6834C25.0793 25.121 24.8335 25.7145 24.8335 26.3333V63.6667C24.8335 64.2855 25.0793 64.879 25.5169 65.3166C25.9545 65.7542 26.548 66 27.1668 66H44.6668" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M59.8332 48.5L62.4501 54.2318L68.7092 54.9493L64.0671 59.2088L65.3189 65.384L59.8332 62.2853L54.3476 65.384L55.5994 59.2088L50.9561 54.9493L57.2164 54.2318L59.8332 48.5Z" fill="#F49E39" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>

    </svg>
  );
};

export default ProjectYellowIcon;

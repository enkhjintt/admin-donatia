type ClassYellowIconProps = {
  size?: "small" | "medium" | "larger" | "extra-large"; // Added "extra-large"
  color?: string;
  inverse?: boolean;
  inverseColor?: string;
  className?: string;
};

const ClassYellowIcon: React.FC<ClassYellowIconProps> = ({
  size = "medium",
  color = "#FFFFFF",
  inverse = false,
  inverseColor = "#6A82FB",
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

      <path
        d="M54 28.3332H30.6667V65.6665H63.3333V37.6665H54V28.3332ZM26 25.9807C26 24.7026 27.0441 23.6665 28.3298 23.6665H56.3333L67.9993 35.3332L68 67.9823C68 69.2806 66.9619 70.3332 65.6821 70.3332H28.3179C27.0378 70.3332 26 69.2708 26 68.019V25.9807ZM50.5677 52.7081C46.9886 54.8221 42.3014 54.3414 39.2262 51.2661C35.5814 47.6212 35.5814 41.7117 39.2262 38.0668C42.8712 34.422 48.7806 34.422 52.4255 38.0668C55.5008 41.142 55.9815 45.8292 53.8675 49.4083L59.0253 54.5659L55.7255 57.8659L50.5677 52.7081ZM49.1257 47.9663C50.9482 46.144 50.9482 43.189 49.1257 41.3667C47.3033 39.5442 44.3486 39.5442 42.5261 41.3667C40.7036 43.189 40.7036 46.144 42.5261 47.9663C44.3486 49.7889 47.3033 49.7889 49.1257 47.9663Z"
        fill="white"
      />
    </svg>
  );
};

export default ClassYellowIcon;

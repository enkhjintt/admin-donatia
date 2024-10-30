type IProps = {
  size?: "medium";
  color?: string;
};

export default function HomeIcon({
  size = "medium",
  color = "stroke-current",
}: IProps) {
  let style = "w-6 h-6";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <svg
      className={`${style} fill-gray-600`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 19.0007H19V9.97888L12 4.53443L5 9.97888V19.0007H11V13.0007H13V19.0007ZM21 20.0007C21 20.553 20.5523 21.0007 20 21.0007H4C3.44772 21.0007 3 20.553 3 20.0007V9.48979C3 9.1812 3.14247 8.8899 3.38606 8.70044L11.3861 2.47822C11.7472 2.19736 12.2528 2.19736 12.6139 2.47822L20.6139 8.70044C20.8575 8.8899 21 9.1812 21 9.48979V20.0007Z"
        className={`${color} `}
      />
    </svg>
  );
}

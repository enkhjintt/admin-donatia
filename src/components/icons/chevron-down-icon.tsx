type IProps = {
  size?: "medium";
  color?: string;
  className?: string;
  inverse?: boolean;
  inverseColor?: string;
};

export default function ChevronDownIcon({
  size = "medium",
  color = "fill-gray-600",
  className,
  inverse,
  inverseColor = "fill-gray-400",
}: IProps) {
  let style = "w-6 h-4";

  switch (size) {
    case "medium":
      break;
  }

  return (
    <svg
      className={`${style} fill-none ${className}`}
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0002 10.3342C15.8444 10.3345 15.6934 10.2803 15.5735 10.1809L11.5735 6.84754C11.29 6.6119 11.2512 6.19104 11.4868 5.90754C11.7225 5.62403 12.1433 5.58523 12.4268 5.82087L16.0002 8.80754L19.5735 5.92754C19.7112 5.81569 19.8879 5.76336 20.0643 5.78213C20.2407 5.8009 20.4024 5.88922 20.5135 6.02754C20.6369 6.16611 20.697 6.34986 20.6793 6.53458C20.6616 6.7193 20.5677 6.88828 20.4202 7.00087L16.4202 10.2209C16.2968 10.3045 16.1489 10.3445 16.0002 10.3342Z"
        className={`${inverse ? inverseColor : color}`}
      />
    </svg>
  );
}

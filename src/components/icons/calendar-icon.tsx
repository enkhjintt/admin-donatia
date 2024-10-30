type IProps = {
  size?: 'medium';
  color?: string;
};

export default function CalendarIcon({
  size = 'medium',
  color = 'fill-current',
}: IProps) {
  let style = 'w-6 h-6';

  switch (size) {
    case 'medium':
      break;
  }

  return (
    <svg
      className={`${style} fill-current`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0V2H13V0H15V2H19C19.5523 2 20 2.44772 20 3V19C20 19.5523 19.5523 20 19 20H1C0.44772 20 0 19.5523 0 19V3C0 2.44772 0.44772 2 1 2H5V0H7ZM18 10H2V18H18V10ZM6 13V15H4V13H6ZM16 13V15H8V13H16ZM5 4H2V8H18V4H15V6H13V4H7V6H5V4Z"
        className={color}
      />
    </svg>
  );
}

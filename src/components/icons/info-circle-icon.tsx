type IProps = {
  size?: "base";
};

const InfoCircle01Icon: React.FC<IProps> = ({ size = "base" }) => {
  const sizeStyle = "w-5 h-5";

  switch (size) {
    case "base":
      break;
  }

  return (
    <svg
      className={`${sizeStyle} fill-none`}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0.832031C4.93743 0.832031 0.833374 4.93609 0.833374 9.9987C0.833374 15.0613 4.93743 19.1654 10 19.1654C15.0626 19.1654 19.1667 15.0613 19.1667 9.9987C19.1667 4.93609 15.0626 0.832031 10 0.832031ZM10 5.83203C9.5398 5.83203 9.16671 6.20513 9.16671 6.66536C9.16671 7.1256 9.5398 7.4987 10 7.4987H10.0084C10.4686 7.4987 10.8417 7.1256 10.8417 6.66536C10.8417 6.20513 10.4686 5.83203 10.0084 5.83203H10ZM10.8334 9.9987C10.8334 9.53846 10.4603 9.16536 10 9.16536C9.5398 9.16536 9.16671 9.53846 9.16671 9.9987V13.332C9.16671 13.7923 9.5398 14.1654 10 14.1654C10.4603 14.1654 10.8334 13.7923 10.8334 13.332V9.9987Z"
        className={"fill-warning-normal"}
      />
    </svg>
  );
};

export default InfoCircle01Icon;

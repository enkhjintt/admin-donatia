type IProps = {
  size?: "base" | "small";
  inverse?: boolean;
  inverseColor?: string;
};

const LogoIcon: React.FC<IProps> = ({ size = "base", inverse = false }) => {
  let sizeStyle = "w-[36px] h-[36px]";

  switch (size) {
    case "base":
      break;

    case "small":
      sizeStyle = "w-6 h-6";
      break;
  }

  return <div>Donatia</div>;
};

export default LogoIcon;

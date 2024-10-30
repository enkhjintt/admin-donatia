import { cn } from "@/utils/merge-style";

type IProps = {
  title: string;
  level?: number;
  className?: string;
  collapsed?: boolean;
};

const Title: React.FC<IProps> = ({
  level = 1,
  title,
  className,
  collapsed,
}) => {
  let style = `font-semibold text-lg tracking-wider my-4`;

  switch (level) {
    case 0:
      style = "text-sm font-semibold text-base-white ";
      break;
    case 1:
      break;
    case 2:
      style = "text-base font-medium  my-3 text-gray-700";
      break;
    case 3:
      style = "text-xl font-bold ";
      break;
    case 4:
      style = "text-lg font-medium ";
      break;
    case 5:
      style = "text-base font-bold ";
      break;
  }

  return (
    <div
      className={cn(
        "transition-all duration-300",
        collapsed ? "opacity-0 h-[auto]" : "opacity-100 h-auto"
      )}
    >
      <h1
        className={cn(
          style,
          "whitespace-nowrap transition-opacity duration-300",
          className
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;

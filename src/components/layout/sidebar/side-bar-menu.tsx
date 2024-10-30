import SubMenuItem from "./sub-menu-item";
import { IMenuList } from "./sidebar";

type IProps = {
  items?: IMenuList[];
};

const SideBarMenuItem: React.FC<IProps> = ({ items = [] }) => {
  return (
    <div className="w-full flex flex-col gap-1 items-start justify-center">
      {items.length > 0 ? (
        items.map((item) => (
          <SubMenuItem
            key={item.name}
            icon={item.icon}
            name={item.name}
            path={item.path}
            code={item.code}
            loading={item.loading}
            hidden={item.hidden}
          />
        ))
      ) : (
        <div className="text-gray-400 text-sm">No items available</div> // Fallback UI
      )}
    </div>
  );
};

export default SideBarMenuItem;
